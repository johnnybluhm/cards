import { Face } from "../enums/Face";
import { Suit } from "../enums/Suits";
import Game from "./Game";

export default class BotManager {
    game: Game;
    constructor(game: Game) {
        this.game = game;
    }

    playBotTurn() {
        const nextPlayer = this.game.players.find(player => player.isTurn)!;
        if (!nextPlayer.isBot) {
            throw new Error("It's not a bot's turn!");
        }
        const deuceOfClubs = nextPlayer.hand.find(card => card.suit === Suit.Clubs && card.face === Face.Two);
        const nonHeartCard = nextPlayer.hand.find(card => card.suit !== Suit.Hearts);
        const clubCard = nextPlayer.hand.find(card => card.suit === Suit.Clubs);
        if (this.game.round.completedTricks.length === 0) {
            if (deuceOfClubs) {
                this.game.updateGame(deuceOfClubs, nextPlayer.id);
            }
            else if (clubCard) {
                this.game.updateGame(clubCard, nextPlayer.id);
            }
            else if (nonHeartCard) {
                this.game.updateGame(nonHeartCard, nextPlayer.id);
            }
            else {
                this.game.updateGame(nextPlayer.hand[0], nextPlayer.id);
            }
            return;
        }
        if (this.game.round.currentTrick.trickSuit) {
            const cardOfTrickSuit = nextPlayer.hand.find(card => card.suit === this.game.round.currentTrick.trickSuit);
            console.log('cardOfTrickSuit', cardOfTrickSuit);
            this.game.updateGame(cardOfTrickSuit ?? nextPlayer.hand[0], nextPlayer.id);
        }
        else {
            this.game.updateGame(nextPlayer.hand[0], nextPlayer.id);
        }
    }
}