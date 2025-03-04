'use client';
//https://www.pedroalonso.net/blog/websockets-nextjs-part-1/
import { Button, TextField } from '@mui/material';
import { useSocket } from './hooks/useSocket';

export default function Home() {
  const { room, joinRoom, messages, sendMessage } = useSocket();

  function SendMessage(event: React.ChangeEvent<HTMLInputElement>) {
    sendMessage(event.target.value);
  }

  console.log('Message Array', messages)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">WebSocket Test</h1>
      <Button
        onClick={joinRoom}
      >Join Room</Button>

      <p>You are in room {room}</p>

      <TextField onChange={SendMessage} label="Name" variant="outlined">

      </TextField>
      Messages:
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </main >
  );
}