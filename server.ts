import { createServer } from 'http';
import next from 'next';
import { Server } from "socket.io";
import { parse } from 'url';
import Message, { Severity } from './src/app/classes/Message';
import SocketRoom from './src/app/classes/SocketRoom';
import { SocketEvent } from './src/app/events/Events';
import GameManager from './src/app/classes/GamesManager';
import { Card } from './src/app/classes/Card';
import { Player } from './src/app/classes/Player';

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url ?? '', true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server);
  const gameManager = new GameManager();
  const rooms: SocketRoom[] = [];

  io.on('connection', socket => {
    console.log('Client connected total clients:', io.engine.clientsCount);
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    socket.on(SocketEvent.JoinRoom, (roomName: string, password: string, playerName: string) => {
      const room = rooms.find(room => room.roomName === roomName);
      if (!room) {
        socket.emit(SocketEvent.Message, new Message(Severity.Error, `Room ${roomName} does not exist`));
        return;
      }
      else if (room.roomPassword !== password) {
        socket.emit(SocketEvent.Message, new Message(Severity.Error, `Password for room ${roomName} is incorrect`));
        return;
      }
      else if (room.players.length == 4) {
        socket.emit(SocketEvent.Message, new Message(Severity.Error, `Room ${roomName} is full`));
        return;
      }
      else if (room.players.some(player => player.id === socket.id)) {
        socket.emit(SocketEvent.Message, new Message(Severity.Error, `You are already in room ${roomName}`));
        return;
      }
      else if (room.players.some(player => player.name.toLocaleLowerCase() === playerName.toLocaleLowerCase())) {
        socket.emit(SocketEvent.Message, new Message(Severity.Error, `Player ${playerName} is already taken in ${roomName}`));
        return;
      }
      else if (room.players.length === 4 && gameManager.getGame(socket.id)) {
        socket.emit(SocketEvent.Message, new Message(Severity.Error, `Game already started`));
        return;
      }
      socket.join(room.roomName);
      room.addPlayer(playerName, socket.id);
      io.to(room.roomName).emit(SocketEvent.Message, new Message(Severity.Info, `A new player ${playerName} has joined the room ${room.roomName}`)); // Notify other players in the room
      socket.emit(SocketEvent.Message, new Message(Severity.Success, `You have joined the room: ${room.roomName}`, SocketEvent.JoinRoom));
      io.to(room.roomName).emit(SocketEvent.JoinRoom, room);

      if (room.players.length === 4) {
        // Start the game when the room is full
        const game = gameManager.createGame(room.players);
        console.log('Starting game for room', room.roomName, 'with players', room.players);
        console.log('Game', game);
        try {
          game.beginNewRound();
        }
        catch (e) {
          const error = e as Error;
          console.log('Error updating game', e);
          socket.emit(SocketEvent.Message, new Message(Severity.Error, error.message));
        }

        io.to(room.roomName).emit(SocketEvent.UpdateGame, JSON.stringify(game));
      }
      //when room is full, do logic to start game and send to room
    });

    socket.on(SocketEvent.CreateRoom, (roomName: string, password: string, playerName: string) => {
      const newRoom = new SocketRoom(roomName, password, new Player(playerName, socket.id));
      if (rooms.some(room => room.roomName === newRoom.roomName)) {
        socket.emit(SocketEvent.Message, new Message(Severity.Error, "Room already Exists. Please choose another name"));
        return;
      }
      socket.join(newRoom.roomName);
      rooms.push(newRoom);
      socket.emit(SocketEvent.Message, new Message(Severity.Success, `You have created the room: ${newRoom.roomName}`, SocketEvent.CreateRoom));
      socket.emit(SocketEvent.JoinRoom, newRoom);
      //clients will get updatedList of rooms every time new one is added
      socket.broadcast.emit(SocketEvent.GetRooms, rooms);
    });

    socket.on(SocketEvent.GetRooms, () => {
      socket.emit(SocketEvent.GetRooms, rooms);
    });

    socket.on(SocketEvent.UpdateGame, (cardPlayed: Card) => {
      const game = gameManager.getGame(socket.id);
      console.log('Got game', game);
      const roomName = rooms.find(room => room.hasPlayer(socket.id))!.roomName;
      try {
        game.updateGame(cardPlayed, socket.id);
        io.to(roomName).emit(SocketEvent.UpdateGame, JSON.stringify(game));
        if (!game.round.isComplete) {
          const nextPlayer = game.players.find(player => player.isTurn)!;
          io.to(nextPlayer.id).emit(SocketEvent.Message, new Message(Severity.Info, `It's your turn!`));
        }
      }
      catch (e) {
        const error = e as Error;
        console.log('Error updating game', e);
        socket.emit(SocketEvent.Message, new Message(Severity.Error, error.message));
      }
    });

    socket.on(SocketEvent.RoundCompleted, () => {
      const game = gameManager.getGame(socket.id);
      const roomName = rooms.find(room => room.hasPlayer(socket.id))!.roomName;
      const player = game.players.find(player => player.id === socket.id)!
      player.isReadyForNextRound = true;
      io.to(roomName).emit(SocketEvent.Message, new Message(Severity.Info, `${player.name} is ready for the next round`));
      if (game.players.every(player => player.isReadyForNextRound)) {
        game.beginNewRound();
        io.to(roomName).emit(SocketEvent.UpdateGame, JSON.stringify(game));
        //cardSwapping logic here
      }
    });
  });

  server.listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
  });
});