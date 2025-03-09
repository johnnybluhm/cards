import { Face } from "../enums/Face";
import { Suit } from "../enums/Suits";
import { Card } from "./Card";

export class Trick {
    cards: Card[] = [];
    points: number = 0;

    addCard(card: Card) {
        this.cards.push(card);
        this.getPoints();
    }

    private getPoints(): void {
        let points = 0;
        for (const card of this.cards) {
            if (card.suit === Suit.Hearts) {
                points += 1;
            }
            else if (card.suit === Suit.Spades && card.face === Face.Queen) {
                points += 13;
            }
            else if (card.suit === Suit.Diamonds && card.face === Face.Jack) {
                points -= 10;
            }
        }
        this.points = points;
    }
}
