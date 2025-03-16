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

    constructor(players: Player[]) {
        this.players = players
        this.deck = new Deck();
        this.round = new Round();
    }

    beginNewRound() {
        if (!this.round.isComplete && this.round.completedTricks.length > 0) {
            throw new Error(`Current round is not complete! ${13 - this.round.completedTricks.length} tricks remaining`);
        }
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
        winningPlayer.isTurn = true;
    }

    updateGame(card: Card, playerId: string): this {
        const player = this.players.find(p => p.id === playerId);
        if (!player!.isTurn) {
            throw new Error("It's not your turn!");
        }
        this.round.addCardToTrick(card, player!.hand);
        player!.removeCard(card);
        player!.isTurn = false;

        if (this.round.isTrickComplete()) {
            this.addTrickToWinningPlayer();
            this.round.moveToNextTrick();
        }
        else {
            const nextPlayerIndex = (this.players.indexOf(player!) + 1) % this.players.length;
            this.players[nextPlayerIndex].isTurn = true;
        }
        return this;
    }

    dealCards() {
        this.players.forEach(player => player.reset());
        for (const [index, card] of this.deck.cards.entries()) {
            const player = this.players[index % this.players.length];
            player.addCard(card);
        }
    }

    completeRound() {
        if (!this.round.isComplete) {
            throw new Error("Round is not complete!");
        }
        //check for moon shooter, and update Totalpoints for players
        const playerShotTheMoon = this.players.find(player => player.checkForMoonShoot());
        if (playerShotTheMoon) {
            this.players.forEach(player => player.totalPoints += 26 + player.roundPoints);
            playerShotTheMoon.totalPoints -= 26;
        }
        else {
            this.players.forEach(player => player.totalPoints += player.roundPoints);
        }
    }

    getMaskedGameStateString(playerId: string): string {
        const copy = JSON.parse(JSON.stringify(this)) as Game;
        copy.players.forEach(player => {
            if (player.id !== playerId) {
                player.hand = new Array(player.hand.length).fill({ face: null, suit: null });
            }
        });
        return JSON.stringify(copy);
    }
}
