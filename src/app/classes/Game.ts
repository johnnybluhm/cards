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
    currentPassType: PassType;
    isCardPassingComplete: boolean = false;

    constructor(players: Player[]) {
        this.players = players
        this.deck = new Deck();
        this.round = new Round();
        this.currentPassType = PassType.Left;
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
        if (!this.isCardPassingComplete) {
            throw new Error("Cannot play until passing is complete!");
        }
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
        this.players.forEach(player => player.isTurn = false);
        this.updatePassType();
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

    updatePassType() {
        switch (this.currentPassType) {
            case PassType.Left:
                this.currentPassType = PassType.Right;
                break;
            case PassType.Right:
                this.currentPassType = PassType.Across;
                break;
            case PassType.Across:
                this.currentPassType = PassType.NoPass;
                break;
            case PassType.NoPass:
                this.currentPassType = PassType.Left;
                break;
        }
    }

    passCards(cards: Card[], playerId: string) {
        if (this.currentPassType === PassType.NoPass) {
            throw new Error("No cards to pass. Pass type is No Pass.");
        }
        else if (cards.length !== 3) {
            throw new Error("You must pass exactly 3 cards.");
        }
        const player = this.players.find(player => player.id === playerId)!;
        player.cardsPassed = cards;
        const playerToPassTo = this.getPlayerToPassTo(player)
        playerToPassTo.cardsReceived = player.cardsPassed;
    }

    completeCardPassing() {
        if (this.isCardPassingComplete) {
            throw new Error("Card passing is already complete!");
        }
        if (!this.canCompleteCardPassing()) {
            throw new Error("Not all players have passed cards!");
        }
        this.players.forEach(player => player.hand = player.hand.filter(card => !player.cardsPassed.includes(card)));
        this.players.forEach(player => player.hand.push(...player.cardsReceived));
        this.isCardPassingComplete = true;
    }

    canCompleteCardPassing(): boolean {
        return this.players.every(player => player.cardsPassed.length === 3);
    }

    private getPlayerToPassTo(passingPlayer: Player): Player {
        const playerIndex = this.players.findIndex(player => player.id === passingPlayer.id);
        switch (this.currentPassType) {
            case PassType.Left:
                return this.players[(playerIndex + 3) % this.players.length];
            case PassType.Right:
                return this.players[(playerIndex + 1) % this.players.length];
            case PassType.Across:
                return this.players[(playerIndex + 2) % this.players.length];
            default:
                throw new Error("Invalid pass type");
        }
    }
}

enum PassType {
    Left = "Left",
    Right = "Right",
    Across = "Across",
    NoPass = "No Pass"
}
