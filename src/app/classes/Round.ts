import { Face } from "../enums/Face";
import { Suit } from "../enums/Suits";
import { Card } from "./Card";
import { Trick } from "./Trick";

export class Round {
    completedTricks: Trick[];
    currentTrick: Trick;
    isComplete: boolean;
    isHeartsBroken: boolean = false;
    constructor() {
        this.completedTricks = [];
        this.currentTrick = new Trick();
        this.isComplete = false;
    }

    addCardToTrick(card: Card, playerCardsInHand: Card[]): void {
        if (this.completedTricks.length === 0) {
            //logic for first trick of the round
            if (this.currentTrick.cards.length === 0 && !(card.face === Face.Two && card.suit === Suit.Clubs)) {
                throw new Error("You must play the Deuce of Clubs to start the round");
            }
            if (card.suit === Suit.Hearts) {
                throw new Error("You cannot play hearts on the first trick");
            }
            if (card.suit === Suit.Spades && card.face === Face.Queen) {
                throw new Error("You cannot play the Queen of Spades on the first trick");
            }
        }
        if (!this.isHeartsBroken && card.suit === Suit.Hearts) {
            if (this.currentTrick.cards.length === 0) {
                throw new Error("You cannot lead hearts until hearts have been broken");
            }
            this.isHeartsBroken = true;
        }

        this.currentTrick.addCard(card, playerCardsInHand);
    }

    isTrickComplete(): boolean {
        return this.currentTrick.cards.length === 4;
    }

    moveToNextTrick() {
        this.completedTricks.push(this.currentTrick);
        this.isComplete = this.completedTricks.length === 13;
        this.currentTrick = new Trick();
    }
}
