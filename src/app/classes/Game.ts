import { UUID } from "crypto";
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
        this.round = new Round(this.players.map(player => player.name));
        this.round.start();
    }

    addTrickToWinningPlayer(): void {
        const winningCard = this.round.currentTrick.getWinningCard();
        this.players.find(player => player.id === winningCard.ownerId)!.addTrickWon(this.round.currentTrick);
    }

    updateGame(card: Card, playerId: UUID) {
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
}
