export class Card {
    suit: Suit;
    face: Face;

    constructor(suit: Suit, face: Face) {
        this.suit = suit;
        this.face = face;
    }
}

export type Face = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
export type Suit = 'H' | 'D' | 'C' | 'S';