import { Face } from "../enums/Face";
import { Suit } from "../enums/Suits";
import { Card } from "./Card";

export class Deck {
    cards: Card[];

    constructor() {
        this.cards = [];
        const suits: Suit[] = [Suit.Hearts, Suit.Diamonds, Suit.Clubs, Suit.Spades]; // Use Suit enum
        const faces: Face[] = [Face.Two, Face.Three, Face.Four, Face.Five, Face.Six, Face.Seven, Face.Eight, Face.Nine, Face.Ten, Face.Jack, Face.Queen, Face.King, Face.Ace]; // Use Face enum

        for (const suit of suits) {
            for (const face of faces) {
                this.cards.push(new Card(suit, face));
            }
        }
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    sort() {
        this.cards.sort((a, b) => {
            if (a.suit === b.suit) {
                return a.face - b.face;
            }
            return a.suit - b.suit;
        });
    }
}