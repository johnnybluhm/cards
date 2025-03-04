'use client';
//https://www.pedroalonso.net/blog/websockets-nextjs-part-1/
import { Button } from '@mui/material';
import { useEffect, useState } from 'react'; // Adjust the path as necessary
import io from 'socket.io-client';
import { Events, EventsCallbacks } from './events/Events';

export default function Home() {
  const [socket, setSocket] = useState(io());
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });
    socket.on(Events.message, EventsCallbacks.message);
    socket.on(Events.joinRoom, EventsCallbacks.message);
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">WebSocket Test</h1>
      <Button 
        onClick={joinRoom}
      >Join Room</Button>
    </main>
  );
}