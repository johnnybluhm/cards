import { Card } from '@/app/classes/Card';
import GameManager from '@/app/classes/GamesManager';
import { Events } from '@/app/events/Events';
import { createServer } from 'http';
import next from 'next';
import { Server } from "socket.io";
import { parse } from 'url';

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url ?? '', true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server);
  const gameManager = new GameManager();

  io.on('connection', socket => {
    console.log('Client connected total clients:', io.engine.clientsCount);
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    socket.on(Events.joinRoom, (room: string) => {
      socket.join(room);
      console.log(`Client joined room: ${room}`);
      io.to(room).emit(Events.message, `A new player has joined the room: ${room}`); // Notify other players in the room
      io.to(room).emit(Events.joinRoom, room);
    });

    socket.on(Events.message, (message: string, room: string) => {
      console.log('In server message', message)
      if (!room) {
        console.log('Emitting message to client socketId', socket.id);
        io.to(socket.id).emit(Events.message, "You need to join a room to send messages");
        return;
      }
      io.to(room).emit(Events.message, message);
      console.log(`Message from client in room ${room}: ${message}`);
    });

    socket.on('play-card', (card: Card, playerId: string) => {
      gameManager.getGame(playerId).updateGame(card, playerId);
    });
  });

  server.listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
  });
});