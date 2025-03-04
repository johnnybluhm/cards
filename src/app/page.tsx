'use client';
//https://www.pedroalonso.net/blog/websockets-nextjs-part-1/
import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react'; // Adjust the path as necessary
import io from 'socket.io-client';
import { Events } from './events/Events';

export default function Home() {
  const [socket, setSocket] = useState(io());
  const [room, setRoom] = useState<string | null>(null);
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });
    socket.on(Events.message, (message) => {
      console.log('Message from server', message);
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

  function joinRoom() {
    if (socket) {
      socket.emit(Events.joinRoom, 'room1');
    }
  }

  function SendMessage(event: React.ChangeEvent<HTMLInputElement>) {
    console.log('SendMessage', event.target.value);
    console.log(socket)
    if (socket) {
      socket.emit(Events.message, event.target.value, room);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">WebSocket Test</h1>
      <Button
        onClick={joinRoom}
      >Join Room</Button>

      <p>You are in room {room}</p>

      <TextField onChange={SendMessage} label="Name" variant="outlined">

      </TextField>
    </main >
  );
}