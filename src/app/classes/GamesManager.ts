import Game from "./Game";
import HttpError from "./HttpError";

export default class GameManager {
    games: Game[];
    constructor() {
        this.games = [];
    }

    createGame(playerNames: string[]): Game {
        const game = new Game(playerNames);
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
}
