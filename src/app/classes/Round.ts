import { Card } from "./Card";
import { Deck } from "./Deck";
import { Player } from "./Player";
import { Trick } from "./Trick";

export class Round {
    completedTricks: Trick[];
    currentTrick: Trick;
    cards: Card[];
    constructor(cards: Card[]) {
        this.cards = cards;
        this.completedTricks = [];
        this.currentTrick = new Trick();
    }

    addCardToTrick(card: Card) {
        this.currentTrick.addCard(card);
    }

    isTrickComplete(): boolean {
        return this.currentTrick.cards.length === 4;
    }

    moveToNextTrick() {
        this.completedTricks.push(this.currentTrick);
        this.currentTrick = new Trick();
    }
}
}
