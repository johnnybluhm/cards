import { UUID } from "crypto";
import Game from "./Game";

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

    getGame(playerId: UUID) {
        return this.games.find(game => game.players.some(player => player.id === playerId));
    }
}
