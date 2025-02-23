import { Card } from "./card";

export class Deck {
    cards: Card[];

    constructor() {
        this.cards = [];
        const suits: Suit[] = ['H', 'D', 'C', 'S'];
        const faces: Face[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

        for (const suit of suits) {
            for (const face of faces) {
                this.cards.push(new Card(suit, face));
            }
        }
    }
}

export type Face = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
export type Suit = 'H' | 'D' | 'C' | 'S';