import { Card } from "./Card";
import { Deck } from "./Deck";
import { Player } from "./Player";
import { Round } from "./Round";

export default class Game {
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
        this.deck = new Deck();
        this.deck.shuffle();
        this.dealCards();
        this.round = new Round(this.deck.cards);
        this.round.start();
    }

    addTrickToWinningPlayer(): void {
        const winningCard = this.round.currentTrick.getWinningCard();
        this.players.find(player => player.id === winningCard.ownerId)!.addTrickWon(this.round.currentTrick);
    }

    updateGame(card: Card, playerId: string) {
        const player = this.players.find(p => p.id === playerId);
        if (!player!.isTurn) {
            throw new Error("It's not your turn!");
        }
        player!.removeCard(card);
        this.round.addCardToTrick(card);
        if (this.round.isTrickComplete()) {
            this.addTrickToWinningPlayer();
            this.round.moveToNextTrick();
            player?.isTurn
        }
    }

    dealCards() {
        for (const [index, card] of this.deck.cards.entries()) {
            const player = this.players[index % this.players.length];
            player?.addCard(card);
        }
    }
}
