import _ from 'lodash';
import { Face } from "../enums/Face";
import { Suit } from "../enums/Suits";
import { Card } from "./Card";
import Game, { PassType } from "./Game";
import { Dispatch, SetStateAction } from 'react';
import Message, { Severity } from './Message';

export default class BotManager {
    moveDelayInMs = 500;
    game: Game;
    setGame: (game: Game) => void;
    setMessage: Dispatch<SetStateAction<Message | null>>;
    constructor(game: Game, setGame: (game: Game) => void, setMessage: Dispatch<SetStateAction<Message | null>>) {
        this.game = game;
        this.setGame = setGame;
        this.setMessage = setMessage;
    }

    playBotTurn() {

        const nextPlayer = this.game.players.find(player => player.isTurn)!;
        if (!nextPlayer.isBot) {
            throw new Error("Calling play bot turn but its the humans turn!");
        }
        const deuceOfClubs = nextPlayer.hand.find(card => card.suit === Suit.Clubs && card.face === Face.Two);
        const nonHeartCard = nextPlayer.hand.find(card => card.suit !== Suit.Hearts);
        const clubCard = nextPlayer.hand.find(card => card.suit === Suit.Clubs);
        //this logic is fault, I got you must follow trick suit error
        //also need to handle playing hearts after hearts are broken
        if (this.game.round.completedTricks.length === 0) {
            console.log('Completed trick is 0 if')
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
        if (this.game.round.currentTrick.trickSuit != null) {
            const cardOfTrickSuit = nextPlayer.hand.find(card => card.suit === this.game.round.currentTrick.trickSuit);
            this.game.updateGame(cardOfTrickSuit ?? nextPlayer.hand[0], nextPlayer.id);
        }
        else if (!this.game.round.isHeartsBroken && this.game.round.currentTrick.cards.length === 0) {
            this.game.updateGame(nonHeartCard ?? nextPlayer.hand[0], nextPlayer.id);
        }
        else {
            this.game.updateGame(nextPlayer.hand[0], nextPlayer.id);
        }
    }

    async passCards(humanCardsPassed: Card[]) {
        console.log('passing cards', humanCardsPassed);
        this.game.passCards(humanCardsPassed, this.game.players[0].id);
        const bots = this.game.players.filter(player => player.isBot);
        bots.forEach(bot => {
            const cardsToPass = bot.hand.slice(0, 3);
            this.game.passCards(cardsToPass, bot.id);
        });
        this.game.completeCardPassing();
        this.setGame(_.cloneDeep(this.game));
        let nextPlayer = this.game.players.find(player => player.isTurn)!;
        await this.sleep(this.moveDelayInMs);
        if (nextPlayer.isBot) {
            while (nextPlayer.isBot) {
                this.playBotTurn();
                this.setGame(_.cloneDeep(this.game));
                await this.sleep(this.moveDelayInMs);
                nextPlayer = this.game.players.find(player => player.isTurn)!;
            }
        }
        if (this.game.players[0].isTurn) {
            this.setMessage(new Message(Severity.Info, "It's your turn!"));
        }
    }

    async updateGame(cardPlayed: Card) {
        try {
            this.game.updateGame(cardPlayed, this.game.players[0].id);
        }
        catch (e) {
            const error = e as Error;
            this.setMessage(new Message(Severity.Error, error.message));
            return;
        }
        this.setGame(_.cloneDeep(this.game));
        await this.sleep(this.moveDelayInMs);
        console.log('next player before loop', this.game.players.find(player => player.isTurn));
        let nextPlayer = this.game.players.find(player => player.isTurn)!;
        while (nextPlayer.isBot && !this.game.round.isComplete) {
            this.playBotTurn();
            this.setGame(_.cloneDeep(this.game));
            await this.sleep(this.moveDelayInMs);
            nextPlayer = this.game.players.find(player => player.isTurn)!;
            console.log('next player in loop-------------', nextPlayer);
        }
        if (this.game.players[0].isTurn) {
            this.setMessage(new Message(Severity.Info, "It's your turn!"));
        }
        if (this.game.round.isComplete) {
            this.game.completeRound();
            this.game.players.forEach(player => player.isReadyForNextRound = true);
            this.game.players[0].isReadyForNextRound = false;
            console.log('Game after complete round', this.game);
            this.setGame(_.cloneDeep(this.game));
        }
    }

    async completeRound() {
        this.game.beginNewRound();
        this.setGame(_.cloneDeep(this.game));
        if (this.game.currentPassType === PassType.NoPass) {
            let nextPlayer = this.game.players.find(player => player.isTurn)!;
            console.log('No pass nexrt player', nextPlayer);
            await this.sleep(this.moveDelayInMs);
            if (nextPlayer.isBot) {
                while (nextPlayer.isBot) {
                    this.playBotTurn();
                    this.setGame(_.cloneDeep(this.game));
                    await this.sleep(this.moveDelayInMs);
                    nextPlayer = this.game.players.find(player => player.isTurn)!;
                }
            }
        }
        if (this.game.players[0].isTurn) {
            this.setMessage(new Message(Severity.Info, "It's your turn!"));
        }
    }

    updateAnimationSpeed(factor: number) {
        this.moveDelayInMs = 1000 * factor / 100;
        console.log('move delay in ms', this.moveDelayInMs);
    }

    private sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}