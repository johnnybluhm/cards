import { createServer } from 'http';
import next from 'next';
import { Server } from "socket.io";
import { parse } from 'url';
import Message, { Severity } from './src/app/classes/Message';
import SocketRoom from './src/app/classes/SocketRoom';
import { SocketEvent } from './src/app/events/Events';

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url ?? '', true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server);
  //const gameManager = new GameManager();
  const rooms: SocketRoom[] = [];

  io.on('connection', socket => {
    console.log('Client connected total clients:', io.engine.clientsCount);
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    socket.on(SocketEvent.JoinRoom, (roomName: string, password: string, playerName: string) => {
      const room = rooms.find(room => room.roomName === roomName && room.roomPassword === password);
      if (!room) {
        console.log(`Room ${roomName} not found or password incorrect`);
        socket.emit(SocketEvent.Message, new Message(Severity.Error, `Room ${roomName} not found or password incorrect`));
        return;
      }
      room.joinRoom(playerName);
      console.log(`Client joined room: ${room.roomName}`);
      io.to(room.roomName).emit(SocketEvent.Message, new Message(Severity.Info, `A new player ${playerName} has joined the room ${room.roomName}`)); // Notify other players in the room
      socket.emit(SocketEvent.Message, new Message(Severity.Success, `You have joined the room: ${room.roomName}`, SocketEvent.JoinRoom));
    });

    socket.on(SocketEvent.CreateRoom, (roomName: string, password: string, playerName: string) => {
      const newRoom = new SocketRoom(roomName, password, playerName);
      if (rooms.some(room => room.roomName === newRoom.roomName)) {
        console.log(`Room ${newRoom.roomName} already exists`);
        socket.emit(SocketEvent.Message, new Message(Severity.Error, "Room already Exists. Please choose another name"));
        return;
      }
      socket.join(newRoom.roomName);
      rooms.push(newRoom);
      console.log(`Client created room: ${newRoom.roomName}`);
      socket.emit(SocketEvent.Message, new Message(Severity.Success, `You have created the room: ${newRoom.roomName}`, SocketEvent.CreateRoom));
      console.log('Emmitting event JoinRoom after create with', newRoom.roomName);
      socket.emit(SocketEvent.JoinRoom, newRoom.roomName);
    });

    socket.on(SocketEvent.GetRooms, () => {
      console.log("In server getRooms", socket.id);
      console.log("Rooms:", rooms);
      socket.emit(SocketEvent.GetRooms, rooms);
    });
  });

  server.listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
  });
});