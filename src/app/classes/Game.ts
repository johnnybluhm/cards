import { Deck } from "./Deck";
import { Player } from "./Player";

export class Game {
    players: Player[];
    deck: Deck;

    constructor(playerNames: string[]) {
        this.players = playerNames.map(name => new Player(name));
        this.deck = new Deck();
        this.deck.shuffle();
    }

    start() {
        this.dealCards();
    }

    dealCards() {
        const numPlayers = this.players.length;
        const numCards = this.deck.cards.length;
        this.deck.shuffle(); // Shuffle the deck before dealing
        for (let i = 0; i < numCards; i++) {
            const player = this.players[i % numPlayers];
            player.addCard(this.deck.cards[i]);
        }
    }

    determineWinner(): Player | null {
        // Implement logic to determine the winner
        return null;
    }
}
