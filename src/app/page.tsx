'use client';
import { use, useEffect } from 'react';
//https://www.pedroalonso.net/blog/websockets-nextjs-part-1/
import './card-styles/cards.css';
import GameComponent from './components/GameComponent';
import RoomForm from './components/RoomForm';
import { useSocket } from './hooks/useSocket';
import { join } from 'path';
import useErrorSnackbar from './hooks/useErrorSnackBar';

export default function Home() {
  const { rooms, getRooms, joinRoom, createRoom, messages } = useSocket();
  const handleRoomSubmit = (joinRoom: string, createRoom: string) => {
    console.log('Join Room:', joinRoom);
    console.log('Create Room:', createRoom);
    // Add logic to handle joining or creating a room
  };
  console.log('Messages in page', messages);
  const {
    setError,
    ErrorSnackBar
  } = useErrorSnackbar();

  useEffect(() => {
    console.log('Getting rooms')
    joinRoom();
    getRooms();
    console.log('Rooms:', rooms);
  }, []);

  useEffect(() => {
    console.log('Use effect messages', messages);
    setError(messages[messages.length - 1]?.content);
  }, [messages, setError]);

  console.log('Rooms:', rooms);

  return (
    <>
      <ErrorSnackBar />
      <h3> Play Hearts</h3 >
      <br />
      <br />
      <RoomForm createRoom={createRoom} existingRooms={rooms} />

    </>
  );
}