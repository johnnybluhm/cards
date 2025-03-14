import { Card } from "./Card";
import { Trick } from "./Trick";

export class Round {
    completedTricks: Trick[];
    currentTrick: Trick;
    constructor() {
        this.completedTricks = [];
        this.currentTrick = new Trick();
    }

    addCardToTrick(card: Card, playerCardsInHand: Card[]): void {
        this.currentTrick.addCard(card, playerCardsInHand);
    }

    isTrickComplete(): boolean {
        return this.currentTrick.cards.length === 4;
    }

    moveToNextTrick() {
        this.completedTricks.push(this.currentTrick);
        this.currentTrick = new Trick();
    }
}
