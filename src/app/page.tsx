'use client';
import { useEffect, useState } from 'react';
//https://www.pedroalonso.net/blog/websockets-nextjs-part-1/
import './card-styles/cards.css';
import GameComponent from './components/GameComponent';
import RoomForm from './components/RoomForm';
import RoundCompleteDialog from './components/RoundCompleteDialog';
import useMessageSnackbar from './hooks/useMessageSnackBar';
import { useSocket } from './hooks/useSocket';

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
    updateGame,
    onRoundCompleted
  } = useSocket();

  const {
    setMessage,
    MessageSnackBar
  } = useMessageSnackbar();

  //we know we are in a room when room is

  useEffect(() => {
    console.log('Getting rooms')
    getRooms();
    const playerName = 'Player' + socketId
    console.log('Rooms:', availableRooms);
    createRoom('test', 'test', playerName);
    joinRoom('test', 'test', playerName);
  }, []);

  useEffect(() => {
    console.log('Use effect messages', messages);
    setMessage(messages[messages.length - 1]);
  }, [messages, setMessage]);

  console.log(game?.round?.isComplete)
  const [isOpen, setIsOpen] = useState(true);
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
        <GameComponent
          game={game}
          updateGame={updateGame}
          socketId={socketId} />}

      <RoundCompleteDialog
        open={isOpen}
        players={game?.players ?? []}
        onRoundCompleted={onRoundCompleted} />
    </>
  );
}