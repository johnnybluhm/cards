export default class SocketRoom {
    id: string;
    players: string[];
    roomPassword: string;
    roomName: string
    constructor(roomName: string, roomPassword: string, playerName: string) {
        this.id = "";
        this.players = [];
        this.players.push(playerName);
        this.roomPassword = roomPassword;
        this.roomName = roomName;

    }
}