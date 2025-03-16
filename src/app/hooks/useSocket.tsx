import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Message from '../classes/Message';
import { SocketEvent } from '../events/Events';
import SocketRoom from '../classes/SocketRoom';
const client = io();
export const useSocket = () => {
    const [socket, setSocket] = useState(client);
    const [chosenRoom, setChosenRoom] = useState<SocketRoom | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [availableRooms, setAvailableRooms] = useState<SocketRoom[]>([]);
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

    return { socketId, chosenRoom, joinRoom, createRoom, availableRooms, getRooms, messages };
};