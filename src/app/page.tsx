'use client';
//https://www.pedroalonso.net/blog/websockets-nextjs-part-1/
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { Events, EventsCallbacks } from './events/Events';
import { DefaultEventsMap } from 'socket.io';

export default function Home() {
  const [socket, setSocket] = useState(io());
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });
    socket.on(Events.message, EventsCallbacks.message);
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
      <button 
        onClick={joinRoom}
        className="bg-blue-500 text-white font-bold py-4 px-8 rounded-lg mt-4"
      >
        Join Room
      </button>
    </main>
  );
}