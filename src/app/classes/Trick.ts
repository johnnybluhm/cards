import { Face } from "../enums/Face";
import { Suit } from "../enums/Suits";
import { Card } from "./Card";

export class Trick {
    cards: Card[] = [];
    points: number = 0;
    trickSuit?: Suit;
    addCard(card: Card, playerCardsInHand: Card[]): void {
        if (this.cards.length === 0) {
            this.trickSuit = card.suit;
        }
        if (this.cards.length > 0 &&
            card.suit !== this.trickSuit &&
            playerCardsInHand.some(c => c.suit === this.trickSuit)) {
            throw new Error(`You must follow the trick suit. Trick suit is ${SuitString[this.trickSuit!]} and you tried playing ${FaceString[card.face]} of ${SuitString[card.suit]}`);
        }
        this.cards.push(card);
        this.updatePoints();
    }

    getWinningCard(): Card {
        if (this.cards.length < 4) {
            throw new Error("Not enough cards to determine a winner");
        }
        let winningCard = this.cards[0];
        for (const card of this.cards) {
            if (card.face > winningCard.face && card.suit === this.trickSuit) {
                winningCard = card;
            }
        }

        return winningCard;
    }

    private updatePoints(): void {
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

const FaceString = {
    [Face.Ace]: "Ace",
    [Face.Two]: "2",
    [Face.Three]: "3",
    [Face.Four]: "4",
    [Face.Five]: "5",
    [Face.Six]: "6",
    [Face.Seven]: "7",
    [Face.Eight]: "8",
    [Face.Nine]: "9",
    [Face.Ten]: "10",
    [Face.Jack]: "Jack",
    [Face.Queen]: "Queen",
    [Face.King]: "King"
};

const SuitString = {
    [Suit.Hearts]: "Hearts",
    [Suit.Diamonds]: "Diamondss",
    [Suit.Clubs]: "Clubs",
    [Suit.Spades]: "Spades"
};
