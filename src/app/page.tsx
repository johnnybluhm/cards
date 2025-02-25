'use client';
//https://www.pedroalonso.net/blog/websockets-nextjs-part-1/
import { useEffect } from 'react';
import io from 'socket.io-client';
import { Events, EventsCallbacks } from './events/Events';

export default function Home() {
  useEffect(() => {
    const socket = io();

    socket.on('connect', () => {
      console.log('Connected to server');
    });
    socket.on(Events.message, EventsCallbacks.message);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">WebSocket Test</h1>
      <button onClick={}></button>
    </main>
  );
}