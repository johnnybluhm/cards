import { Face } from "../enums/Face";
import { Suit } from "../enums/Suits";
import { Card } from "./Card";
import Game from "./Game";

export default class BotManager {
    game: Game;
    setGame: (game: Game) => void;
    constructor(game: Game, setGame: (game: Game) => void) {
        this.game = game;
        this.setGame = setGame;
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
            this.game.updateGame(cardOfTrickSuit ?? nextPlayer.hand[0], nextPlayer.id);
        }
        else {
            this.game.updateGame(nextPlayer.hand[0], nextPlayer.id);
        }
    }

    passCards(humanCardsPassed: Card[]) {
        //implement bot card passing logic
        this.game.passCards(humanCardsPassed, this.game.players[0].id);
        const bots = this.game.players.filter(player => player.isBot);
        bots.forEach(bot => {
            const cardsToPass = bot.hand.slice(0, 3);
            this.game.passCards(cardsToPass, bot.id);
        });
        this.game.completeCardPassing();
        this.setGame(this.game);
    }

    async updateGame(cardPlayed: Card) {
        this.game.updateGame(cardPlayed, this.game.players[0].id);
        this.setGame(this.game);
        await this.sleep(1000);
        const nextPlayer = this.game.players.find(player => player.isTurn)!;
        while (nextPlayer.isBot) {
            this.playBotTurn();
            this.setGame(this.game);
            await this.sleep(1000);
        }
    }

    private sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}