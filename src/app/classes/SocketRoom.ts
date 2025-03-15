import { v4 as uuidv4 } from 'uuid';
export default class SocketRoom {
    id: string;
    players: string[];
    roomPassword: string;
    roomName: string
    constructor(roomName: string, roomPassword: string, playerName: string) {
        this.id = uuidv4();
        this.players = [];
        this.players.push(playerName);
        this.roomPassword = roomPassword;
        this.roomName = roomName;
    }

    joinRoom(playerName: string) {
        this.players.push(playerName);
    }
}