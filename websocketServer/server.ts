import { createServer } from 'http';
import { Server } from "socket.io";
import { Card } from '../src/app/classes/Card';
import Game from '../src/app/classes/Game';
import GameManager from '../src/app/classes/GamesManager';
import Message, { Severity } from '../src/app/classes/Message';
import { Player } from '../src/app/classes/Player';
import SocketRoom from '../src/app/classes/SocketRoom';
import { SocketEvent } from '../src/app/events/Events';

const server = createServer((req, res) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  res.end('Hello, world!');
});

const io = new Server(server, {
  cors: {
    //origin: "http://45.21.221.67:3000",
    methods: ["GET", "POST"]
  }
});
const gameManager = new GameManager();
const rooms: SocketRoom[] = [];

io.on('connection', socket => {
  console.log('Client connected total clients:', io.engine.clientsCount);
  socket.on('disconnect', () => {
    const roomPlayerWasIn = rooms.find(room => room.hasPlayer(socket.id));
    if (!roomPlayerWasIn) return;
    roomPlayerWasIn.removePlayer(socket.id);
    console.log('Client disconnected');
    io.to(roomPlayerWasIn.roomName).emit(SocketEvent.Message, new Message(Severity.Info,
      `${roomPlayerWasIn.players.find(player => player.id === socket.id)?.name}} has left the room ${roomPlayerWasIn.roomName}`));

    io.to(roomPlayerWasIn.roomName).emit(SocketEvent.UpdateGame, null);

    io.to(roomPlayerWasIn.roomName).emit(SocketEvent.Message, new Message(Severity.Error, `Game has ended as player left`));
    gameManager.removeGame(roomPlayerWasIn.id);
    rooms.splice(rooms.indexOf(roomPlayerWasIn), 1);
    socket.leave(roomPlayerWasIn.roomName);
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
    else if (gameManager.getGameByRoomId(room.id)) {
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
      const game = gameManager.createGame(room.players, room.id);
      //start game as round complete
      game.round.isComplete = true;
      console.log('Starting game for room', room.roomName, 'with players', room.players);

      sendMaskedGameToClients(game);
    }
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
    const room = rooms.find(room => room.hasPlayer(socket.id))!;
    try {
      game.updateGame(cardPlayed, socket.id);
      sendMaskedGameToClients(game);
      if (game.round.isComplete) {
        game.completeRound();
        const winner = game.getWinnerOfGame();
        if (winner) {
          io.to(room.roomName).emit(SocketEvent.Message, new Message(Severity.Success, `${winner.name} has won the game!`));
          gameManager.removeGame(game.roomId);
          rooms.splice(rooms.indexOf(room), 1);
          socket.leave(room.roomName);
          return;
        }
      }
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
    player.isReadyForNextRound = !player.isReadyForNextRound;
    io.to(roomName).emit(SocketEvent.UpdateGame, JSON.stringify(game));
    if (game.players.every(player => player.isReadyForNextRound)) {
      game.beginNewRound();
      sendMaskedGameToClients(game);
    }
  });

  socket.on(SocketEvent.CardPass, (passedCards: Card[]) => {
    try {
      const game = gameManager.getGame(socket.id);
      if (game.isCardPassingComplete) {
        socket.emit(SocketEvent.Message, new Message(Severity.Error, "Card passing is already complete"));
        return;
      }
      const player = game.players.find(player => player.id === socket.id)!
      game.passCards(passedCards, player.id);
      if (game.canCompleteCardPassing()) {
        game.completeCardPassing();
        const nextPlayer = game.players.find(player => player.isTurn)!;
        io.to(nextPlayer.id).emit(SocketEvent.Message, new Message(Severity.Info, `It's your turn!`));
      }
      sendMaskedGameToClients(game);
    }
    catch (e) {
      const error = e as Error;
      console.log('Error passing cards', e);
      socket.emit(SocketEvent.Message, new Message(Severity.Error, error.message));
    }
  });

  function sendMaskedGameToClients(game: Game) {
    for (const player of game.players) {
      io.to(player.id).emit(SocketEvent.UpdateGame, game.getMaskedGameStateString(player.id));
    }
  }
});

server.listen(3001, () => {
  console.log('> Ready on http://localhost:3001');
});

