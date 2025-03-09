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

    getWinningIndex(): number {
        if (this.cards.length < 4) {
            throw new Error("Not enough cards to determine a winner");
        }
        let winningIndex = 0;
        let winningCard = this.cards[0];

        for (let i = 1; i < this.cards.length; i++) {
            const card = this.cards[i];
            //check spades and highest one is winner
            if (card.suit === Suit.Spades) {
                if (winningCard.suit === Suit.Spades && card.face > winningCard.face) {
                    winningCard = card;
                    winningIndex = i;
                }
            }
            else if (winningCard.suit !== Suit.Spades) {
                if (card.face > winningCard.face) {
                    winningCard = card;
                    winningIndex = i;
                }
            }
        }
        return winningIndex;
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
