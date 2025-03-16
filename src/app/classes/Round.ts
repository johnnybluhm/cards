import { Face } from "../enums/Face";
import { Suit } from "../enums/Suits";
import { Card } from "./Card";
import { Trick } from "./Trick";

export class Round {
    completedTricks: Trick[];
    currentTrick: Trick;
    isComplete: boolean;
    constructor() {
        this.completedTricks = [];
        this.currentTrick = new Trick();
        this.isComplete = false;
    }

    addCardToTrick(card: Card, playerCardsInHand: Card[]): void {
        if (this.completedTricks.length === 0) {
            //logic for first trick of the round
            if (this.currentTrick.cards.length === 0 && card.suit !== Suit.Clubs && card.face !== Face.Two) {
                throw new Error("You must play the Two of Clubs to start the round");
            }
            if (card.suit === Suit.Hearts) {
                throw new Error("You cannot play hearts on the first trick");
            }
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
