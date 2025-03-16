import { Card } from "./Card";
import { Trick } from "./Trick";
export class Player {
    name: string;
    hand: Card[];
    tricksWon: Trick[];
    totalPoints: number;
    id: string;
    isTurn: boolean;
    roundPoints: number;

    constructor(name: string, id: string) {
        this.name = name;
        this.hand = [];
        this.tricksWon = [];
        this.totalPoints = 0;
        this.roundPoints = 0;
        this.id = id
        this.isTurn = false;
    }

    addCard(card: Card) {
        card.addOwner(this.id);
        this.hand.push(card);
    }

    addTrickWon(trick: Trick) {
        this.tricksWon.push(trick);
    }

    updatePoints() {
        this.totalPoints = this.tricksWon.reduce((acc, trick) => acc + trick.points, 0);
    }

    removeCard(card: Card) {
        const index = this.hand.findIndex(c => c.face === card.face && c.suit === card.suit && c.ownerId === this.id);
        if (index > -1) {
            this.hand.splice(index, 1);
            return true;
        }
        return false;
    }

    reset() {
        this.roundPoints = 0;
        this.hand = [];
        this.tricksWon = [];
        this.isTurn = false;
    }

}
