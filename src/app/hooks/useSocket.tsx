import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Events } from '../events/Events';
const client = io();
export const useSocket = () => {
    const [socket, setSocket] = useState(client);
    const [room, setRoom] = useState<string | null>(null);
    const [messages, setMessages] = useState<string[]>([]);
    useEffect(() => {
        console.log('useEffect', socket);
        socket.on('connect', () => {
            console.log('Connected to server');
        });
        socket.on(Events.message, (message: string) => {
            console.log('Message from server', message);
            messages.push(message);
            setMessages((prevMessages) => [...prevMessages, message])
        });
        socket.on(Events.joinRoom, (room) => {
            console.log('Joined room:', room);
            console.log('Room:', room);
            setRoom(room);
        });
        setSocket(socket);
        return () => {
            socket.disconnect();
        };
    }, []);
    console.log("RE redner", socket)
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

    return { room, joinRoom, messages, sendMessage };
};