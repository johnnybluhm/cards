import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Message from '../classes/Message';
import { SocketEvent } from '../events/Events';
import SocketRoom from '../classes/SocketRoom';
import Game from '../classes/Game';
import { Card } from '../classes/Card';
import { Suit } from '../enums/Suits';
import { Face } from '../enums/Face';
const client = io();
export const useSocket = () => {
    const [socket, setSocket] = useState(client);
    const [chosenRoom, setChosenRoom] = useState<SocketRoom | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [availableRooms, setAvailableRooms] = useState<SocketRoom[]>([]);
    const [game, setGame] = useState<Game | null>(null);
    const socketId = socket.id;
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });
        socket.on(SocketEvent.Message, (message: Message) => {
            console.log('Message from server', message);
            messages.push(message);
            setMessages((prevMessages) => [...prevMessages, message])
        });
        socket.on(SocketEvent.JoinRoom, (roomName) => {
            console.log('JoinRoom event emitted by server', roomName);
            setChosenRoom(roomName);
        });
        socket.on(SocketEvent.GetRooms, (rooms) => {
            console.log('Seeting rooms on client', rooms);
            setAvailableRooms(rooms);
        });

        socket.on(SocketEvent.UpdateGame, (updatedGame: string) => {
            const game = JSON.parse(updatedGame) as Game;
            console.log('Got game', game);
            setGame(game);
            const playerToPlay = game.players.find(player => player.isTurn);
            if (playerToPlay && (playerToPlay.id === socket.id)) {
                //auto play logic
                const deuceOfClubs = playerToPlay.hand.find(card => card.suit === Suit.Clubs && card.face === Face.Two);
                const nonHeartCard = playerToPlay.hand.find(card => card.suit !== Suit.Hearts);
                const clubCard = playerToPlay.hand.find(card => card.suit === Suit.Clubs);
                if (game.round.completedTricks.length === 0) {
                    if (deuceOfClubs) {
                        socket.emit(SocketEvent.UpdateGame, deuceOfClubs);
                    }
                    else if (clubCard) {
                        socket.emit(SocketEvent.UpdateGame, clubCard);
                    }
                    else if (nonHeartCard) {
                        socket.emit(SocketEvent.UpdateGame, nonHeartCard);
                    }
                    else {
                        socket.emit(SocketEvent.UpdateGame, playerToPlay.hand[0]);
                    }
                    return;
                }
                if (game.round.currentTrick.trickSuit) {
                    const cardOfTrickSuit = playerToPlay.hand.find(card => card.suit === game.round.currentTrick.trickSuit);
                    console.log('cardOfTrickSuit', cardOfTrickSuit);
                    socket.emit(SocketEvent.UpdateGame, cardOfTrickSuit ?? playerToPlay.hand[0]);
                }
                else {
                    socket.emit(SocketEvent.UpdateGame, playerToPlay.hand[0]);
                }
            }
        });
        setSocket(socket);
        return () => {
            socket.disconnect();
        };
    }, []);

    function joinRoom(roomName: string, password: string, playerName: string) {
        if (socket) {
            socket.emit(SocketEvent.JoinRoom, roomName, password, playerName);
        }
    }

    function getRooms() {
        console.log('client socket id', socket.id);
        if (socket) {
            socket.emit(SocketEvent.GetRooms);
        }
    }

    function createRoom(roomName: string, password: string, playerName: string) {
        if (socket) {
            socket.emit(SocketEvent.CreateRoom, roomName, password, playerName);
        }
    }

    function updateGame(cardPlayed: Card) {
        if (socket) {
            socket.emit(SocketEvent.UpdateGame, cardPlayed);
        }
    }

    function onRoundCompleted() {
        if (socket) {
            socket.emit(SocketEvent.RoundCompleted);
        }
    }

    return { socketId, chosenRoom, joinRoom, createRoom, availableRooms, getRooms, messages, game, updateGame, onRoundCompleted };
};