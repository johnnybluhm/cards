import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Events } from '../events/Events';
const client = io();
export const useSocket = () => {
    const [socket, setSocket] = useState(client);
    const [room, setRoom] = useState<string | null>(null);
    const [messages, setMessages] = useState<string[]>([]);
    const [rooms, setRooms] = useState<string[]>([]);
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });
        socket.on(Events.message, (message: string) => {
            console.log('Message from server', message);
            messages.push(message);
            setMessages((prevMessages) => [...prevMessages, message])
        });
        socket.on(Events.joinRoom, (room) => {
            setRoom(room);
        });
        socket.on(Events.getRooms, (rooms) => {
            console.log('Seeting rooms on client', rooms);
            setRooms(rooms);
        });
        setSocket(socket);
        return () => {
            socket.disconnect();
        };
    }, []);
    const sendMessage = (message: string) => {
        if (socket) {
            socket.emit(Events.message, message, room);
        }
    };

    function joinRoom() {
        if (socket) {
            socket.emit(Events.joinRoom, 'room1');
        }
    }

    function getRooms() {
        console.log('client socket id', socket.id);
        if (socket) {
            socket.emit(Events.getRooms, socket.id);
        }
    }

    return { room, joinRoom, rooms, getRooms, messages, sendMessage };
};