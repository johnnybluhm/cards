import { v4 as uuidv4 } from 'uuid';
import { Player } from './Player';
export default class SocketRoom {
    id: string;
    players: Player[];
    roomPassword: string;
    roomName: string
    constructor(roomName: string, roomPassword: string, initialPlayer: Player) {
        this.id = uuidv4();
        this.players = [];
        this.players.push(initialPlayer);
        this.roomPassword = roomPassword;
        this.roomName = roomName;
    }

    addPlayer(playerName: string, socketId: string) {
        this.players.push(new Player(playerName, socketId));
    }

    hasPlayer(playerId: string) {
        return this.players.some(player => player.id === playerId);
    }

    removePlayer(playerId: string) {
        this.players = this.players.filter(player => player.id !== playerId);
    }
}