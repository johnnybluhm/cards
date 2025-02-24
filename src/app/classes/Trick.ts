import { Face } from "../enums/Face";
import { Suit } from "../enums/Suits";
import { Card } from "./Card";

export class Trick {
    cards: Card[];

    constructor(cards: Card[]) {
        if(cards.length !== 4) {
            throw new Error("A trick must contain exactly 4 cards.");
        }
        this.cards = cards;
    }

    getPoints(): number {
        let points = 0;
        for (const card of this.cards) {
            if(card.suit === Suit.Hearts) {
                points += 1;
            }
            else if(card.suit === Suit.Spades && card.face === Face.Queen) {
                points += 13;
            }
            else if(card.suit === Suit.Diamonds && card.face === Face.Jack) {
                points -= 10; 
            }
        }
        return points;
    }
}
