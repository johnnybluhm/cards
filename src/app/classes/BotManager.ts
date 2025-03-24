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
        console.log('Playing bot turn')
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

    async passCards(humanCardsPassed: Card[]) {
        //implement bot card passing logic
        console.log('humanCardsPassed', humanCardsPassed);
        this.game.passCards(humanCardsPassed, this.game.players[0].id);
        const bots = this.game.players.filter(player => player.isBot);
        console.log('bots', bots);
        bots.forEach(bot => {
            const cardsToPass = bot.hand.slice(0, 3);
            console.log('cardsToPass', cardsToPass);
            this.game.passCards(cardsToPass, bot.id);
        });
        console.log('before complete passing game', this.game);
        this.game.completeCardPassing();
        console.log('after complete passing game', this.game);
        this.setGame(JSON.parse(JSON.stringify(this.game)));
        const nextPlayer = this.game.players.find(player => player.isTurn)!;
        await this.sleep(1000);
        if (nextPlayer.isBot) {
            while (nextPlayer.isBot) {
                this.playBotTurn();
                console.log('Setting game after bot turn', this.game);
                this.setGame(JSON.parse(JSON.stringify(this.game)));
                await this.sleep(1000);
            }
        }
    }

    async updateGame(cardPlayed: Card) {
        this.game.updateGame(cardPlayed, this.game.players[0].id);
        this.setGame(JSON.parse(JSON.stringify(this.game)));
        await this.sleep(1000);
        const nextPlayer = this.game.players.find(player => player.isTurn)!;
        while (nextPlayer.isBot) {
            this.playBotTurn();
            this.setGame(JSON.parse(JSON.stringify(this.game)));
            await this.sleep(1000);
        }
    }

    private sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}