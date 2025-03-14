'use client';
import { use, useEffect } from 'react';
//https://www.pedroalonso.net/blog/websockets-nextjs-part-1/
import './card-styles/cards.css';
import GameComponent from './components/GameComponent';
import RoomForm from './components/RoomForm';
import { useSocket } from './hooks/useSocket';
import { join } from 'path';

export default function Home() {
  const { rooms, getRooms, joinRoom } = useSocket();
  const handleRoomSubmit = (joinRoom: string, createRoom: string) => {
    console.log('Join Room:', joinRoom);
    console.log('Create Room:', createRoom);
    // Add logic to handle joining or creating a room
  };

  useEffect(() => {
    console.log('Getting rooms')
    joinRoom();
    getRooms();
    console.log('Rooms:', rooms);
  }, []);

  console.log('Rooms:', rooms);

  return (
    <>
      <h3> Play Hearts</h3 >
      <br />
      <br />
      <RoomForm onSubmit={handleRoomSubmit} existingRooms={rooms}/>
 
    </>
  );
}