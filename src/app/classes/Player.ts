import { Card } from "./Card";

export class Player {
    name: string;
    hand: Card[];

    constructor(name: string) {
        this.name = name;
        this.hand = [];
    }

    addCard(card: Card) {
        this.hand.push(card);
    }

    playCard(card: Card): boolean {
        const index = this.hand.indexOf(card);
        if (index > -1) {
            this.hand.splice(index, 1);
            return true;
        }
        return false;
    }
}
