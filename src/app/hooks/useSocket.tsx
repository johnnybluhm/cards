import { useEffect, useState } from 'react';
import { Card } from '../classes/Card';
import Game from '../classes/Game';
import Message from '../classes/Message';
import SocketRoom from '../classes/SocketRoom';
import { SocketEvent } from '../events/Events';
import { clientSocket } from '../socket'
export const useSocket = () => {
    const [socket, setSocket] = useState(clientSocket);
    const [chosenRoom, setChosenRoom] = useState<SocketRoom | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [availableRooms, setAvailableRooms] = useState<SocketRoom[]>([]);
    const [game, setGame] = useState<Game | null>(null);
    const socketId = socket.id;
    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }
        socket.on('connect', () => {
            console.log('Connected to socket server');
            getRooms(); // Fetch available rooms when connected
        });
        socket.on(SocketEvent.Message, (message: Message) => {
            messages.push(message);
            setMessages((prevMessages) => [...prevMessages, message])
        });
        socket.on(SocketEvent.JoinRoom, (roomName) => {
            setChosenRoom(roomName);
        });
        socket.on(SocketEvent.GetRooms, (rooms) => {
            setAvailableRooms(rooms);
        });

        socket.on(SocketEvent.UpdateGame, (updatedGame: string) => {
            const game = JSON.parse(updatedGame) as Game;
            setGame(game);
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

    function passCards(cards: Card[]) {
        if (socket) {
            socket.emit(SocketEvent.CardPass, cards);
        }
    }

    return { socketId, chosenRoom, joinRoom, createRoom, availableRooms, getRooms, messages, game, updateGame, onRoundCompleted, passCards };
};