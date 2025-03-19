import Game from "./Game";
import HttpError from "./HttpError";
import { Player } from "./Player";

export default class GameManager {
    games: Game[];
    constructor() {
        this.games = [];
    }

    createGame(players: Player[], roomId: string): Game {
        const game = new Game(players);
        game.roomId = roomId;
        this.games.push(game);

        return game;
    }

    getGame(playerId: string): Game {
        const game = this.games.find(game => game.players.some(player => player.id === playerId));
        if (!game) {
            throw new HttpError(`Game not found for player ${playerId}`, 400);
        }
        return game;
    }

    getGameByRoomId(roomId: string): Game | undefined {
        return this.games.find(game => game.roomId === roomId);
    }

    removeGame(roomId: string): void {
        this.games = this.games.filter(game => game.roomId !== roomId);
    }
}
