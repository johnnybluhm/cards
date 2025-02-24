import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server } from "socket.io";
import Game from './src/app/classes/Game'; // Assuming you have a game.js file that exports the Game class
import { Card } from '@/app/classes/Card';

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url ?? '', true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server);

  io.on('connection', client => {
    console.log('Client connected');

    client.on('disconnect', () => {
      console.log('Client disconnected');
    });
    client.on('play-card', (card: Card) => {
      const game = new Game(['Player1', 'Player2']); // Initialize game with player names
      game.beginNewRound(); // Start a new round
      console.log(card.face, card.suit); // Log the card played
    });
    client.broadcast.emit('message', 'Hello from server!');
  });

  server.listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
  });
});