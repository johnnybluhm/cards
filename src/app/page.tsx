'use client';
import { useEffect } from 'react';
//https://www.pedroalonso.net/blog/websockets-nextjs-part-1/
import './card-styles/cards.css';
import RoomForm from './components/RoomForm';
import useMessageSnackbar from './hooks/useMessageSnackBar';
import { useSocket } from './hooks/useSocket';

export default function Home() {
  const { chosenRoom, joinRoom, createRoom, availableRooms, getRooms, messages } = useSocket();
  const {
    setMessage,
    MessageSnackBar
  } = useMessageSnackbar();

  //we know we are in a room when room is

  useEffect(() => {
    console.log('Getting rooms')
    getRooms();
    console.log('Rooms:', availableRooms);
  }, []);

  useEffect(() => {
    console.log('Use effect messages', messages);
    setMessage(messages[messages.length - 1]);
  }, [messages, setMessage]);

  console.log('Rooms:', availableRooms);

  console.log('Chosen room', chosenRoom);

  return (
    <>
      <MessageSnackBar />
      <h3> Play Hearts</h3 >
      <br />
      <br />
      {!chosenRoom && <RoomForm createRoom={createRoom} existingRooms={availableRooms} />}

    </>
  );
}