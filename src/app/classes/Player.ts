import { Card } from "./Card";
import { Trick } from "./Trick";

export class Player {
    name: string;
    hand: Card[];
    tricksWon: Trick[];
    totalPoints: number;

    constructor(name: string) {
        this.name = name;
        this.hand = [];
        this.tricksWon = [];
        this.totalPoints = 0;
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

    addTrickWon(trick: Trick) {
        this.tricksWon.push(trick);
    }

    updatePoints() {
        for (const trick of this.tricksWon) {
            this.totalPoints += trick.getPoints();
        }
        this.tricksWon = []; // Reset tricks won after calculating points
    }
}
