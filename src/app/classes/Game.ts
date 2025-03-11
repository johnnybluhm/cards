import { Face } from "../enums/Face";
import { Suit } from "../enums/Suits";
import { Card } from "./Card";
import { Deck } from "./Deck";
import { Player } from "./Player";
import { Round } from "./Round";

export default class Game {
    deck: Deck;
    players: Player[];
    round: Round

    constructor(playerNames: string[]) {
        this.players = playerNames.map(name => new Player(name));
        this.deck = new Deck();
        this.deck.shuffle();
        this.round = new Round();
    }

    beginNewRound() {
        this.deck = new Deck();
        this.deck.shuffle();
        this.dealCards();
        this.players.find(player => player.hand.some(card => card.face === Face.Two && card.suit === Suit.Clubs))!.isTurn = true;
        this.round = new Round();
    }

    addTrickToWinningPlayer(): void {
        const winningCard = this.round.currentTrick.getWinningCard();
        const winningPlayer = this.players.find(player => player.id === winningCard.ownerId)!;
        winningPlayer.addTrickWon(this.round.currentTrick);
        winningPlayer.updatePoints();
        winningPlayer.isTurn = true;
    }

    updateGame(card: Card, playerId: string): this {
        const player = this.players.find(p => p.id === playerId);
        if (!player!.isTurn) {
            throw new Error("It's not your turn!");
        }
        this.round.addCardToTrick(card, player!.hand);
        player!.removeCard(card);
        if (this.round.isTrickComplete()) {
            this.addTrickToWinningPlayer();
            this.round.moveToNextTrick();
        }
        player!.isTurn = false;
        const nextPlayerIndex = (this.players.indexOf(player!) + 1) % this.players.length;
        this.players[nextPlayerIndex].isTurn = true;
        return this;
    }

    dealCards() {
        this.players.forEach(player => player.reset());
        for (const [index, card] of this.deck.cards.entries()) {
            const player = this.players[index % this.players.length];
            player?.addCard(card);
        }
    }
}
