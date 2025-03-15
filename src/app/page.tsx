'use client';
import { useEffect } from 'react';
//https://www.pedroalonso.net/blog/websockets-nextjs-part-1/
import './card-styles/cards.css';
import RoomForm from './components/RoomForm';
import useMessageSnackbar from './hooks/useMessageSnackBar';
import { useSocket } from './hooks/useSocket';

export default function Home() {
  const { rooms, getRooms, joinRoom, createRoom, messages } = useSocket();
  const handleRoomSubmit = (joinRoom: string, createRoom: string) => {
    console.log('Join Room:', joinRoom);
    console.log('Create Room:', createRoom);
    // Add logic to handle joining or creating a room
  };
  console.log('Messages in page', messages);
  const {
    setMessage,
    MessageSnackBar
  } = useMessageSnackbar();

  useEffect(() => {
    console.log('Getting rooms')
    joinRoom();
    getRooms();
    console.log('Rooms:', rooms);
  }, []);

  useEffect(() => {
    console.log('Use effect messages', messages);
    setMessage(messages[messages.length - 1]);
  }, [messages, setMessage]);

  console.log('Rooms:', rooms);

  return (
    <>
      <MessageSnackBar />
      <h3> Play Hearts</h3 >
      <br />
      <br />
      <RoomForm createRoom={createRoom} existingRooms={rooms} />

    </>
  );
}