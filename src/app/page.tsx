'use client';
import { useEffect } from 'react';
//https://www.pedroalonso.net/blog/websockets-nextjs-part-1/
import './card-styles/cards.css';
import RoomForm from './components/RoomForm';
import useMessageSnackbar from './hooks/useMessageSnackBar';
import { useSocket } from './hooks/useSocket';
import GameComponent from './components/GameComponent';

export default function Home() {
  const {
    socketId,
    chosenRoom,
    joinRoom,
    createRoom,
    availableRooms,
    getRooms,
    messages,
    game,
    updateGame
  } = useSocket();

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
      {!chosenRoom && <RoomForm
        createRoom={createRoom}
        joinRoom={joinRoom}
        availableRooms={availableRooms} />}
      {(chosenRoom?.players && chosenRoom.players.length < 4) &&
        <>
          <h2>Welcome {chosenRoom?.players.find(player => player.id === socketId)?.name}</h2>
          <h2>Room: {chosenRoom?.roomName}</h2>
          <h2>Password: {chosenRoom?.roomPassword}</h2>
          <h2>Current Players:</h2>
          {chosenRoom?.players.map((player, index) => (
            <p key={index}>{player.name}</p>
          ))}

          <p>Waiting on other players</p>
        </>}

      {chosenRoom?.players?.length === 4 &&
        <GameComponent />}
    </>
  );
}