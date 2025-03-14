'use client';
//https://www.pedroalonso.net/blog/websockets-nextjs-part-1/
import './card-styles/cards.css';
import GameComponent from './components/GameComponent';
import RoomForm from './components/RoomForm';

export default function Home() {

  const handleRoomSubmit = (joinRoom: string, createRoom: string) => {
    console.log('Join Room:', joinRoom);
    console.log('Create Room:', createRoom);
    // Add logic to handle joining or creating a room
  };

  return (
    <>
      <h3> Play Hearts</h3 >
      <br />
      <br />
      <RoomForm onSubmit={handleRoomSubmit} />
 
    </>
  );
}