import { v4 as uuidv4 } from 'uuid';
import { Card } from "./Card";
import { Trick } from "./Trick";
export class Player {
    name: string;
    hand: Card[];
    tricksWon: Trick[];
    totalPoints: number;
    id: string;

    constructor(name: string) {
        this.name = name;
        this.hand = [];
        this.tricksWon = [];
        this.totalPoints = 0;
        this.id = uuidv4();
    }

    addCard(card: Card) {
        card.addOwner(this.id);
        this.hand.push(card);
    }

    addTrickWon(trick: Trick) {
        this.tricksWon.push(trick);
    }

    updatePoints() {
        for (const trick of this.tricksWon) {
            this.totalPoints += trick.points;
        }
    }

    removeCard(card: Card) {
        const index = this.hand.indexOf(card);
        if (index > -1) {
            this.hand.splice(index, 1);
            return true;
        }
        return false;
    }

    reset() {
        this.hand = [];
        this.tricksWon = [];
    }

}
