'use client';
import { useEffect } from 'react';
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

  useEffect(() => {
    getRooms();
    const playerName = 'Player' + socketId
    createRoom('test', 'test', playerName);
    joinRoom('test', 'test', playerName);
  }, []);


  useEffect(() => {
    setMessage(messages[messages.length - 1]);
  }, [messages, setMessage]);

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
      {(chosenRoom?.players && chosenRoom.players.length < 4 && !game) &&
        <RoundCompleteDialog
          open={true}
          players={chosenRoom?.players ?? []}
          onRoundCompleted={onRoundCompleted} />}

        <RoundCompleteDialog
          open={game?.round?.isComplete ?? false}
          players={game?.players ?? []}
          onRoundCompleted={onRoundCompleted} />

      {chosenRoom?.players?.length === 4 &&
        <GameComponent
          game={game}
          updateGame={updateGame}
          socketId={socketId} />}
    </>
  );
}