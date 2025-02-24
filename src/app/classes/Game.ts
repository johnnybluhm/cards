import { Deck } from "./Deck";
import { Player } from "./Player";
import { Round } from "./Round";

export class Game {
    playerToStartId: string 
    deck: Deck;
    players: Player[];
    round: Round

    constructor(playerNames: string[]) {
        this.players = playerNames.map(name => new Player(name));
        this.deck = new Deck();
        this.deck.shuffle();
        this.playerToStartId = this.players[0].id; // Set the first player to start
        this.round = new Round(playerNames);
    }

    beginNewRound() {
        this.round = new Round(this.players.map(player => player.name));
        this.round.start();
    }

    determineWinner(): Player | null {
        // Implement logic to determine the winner
        return null;
    }
}
