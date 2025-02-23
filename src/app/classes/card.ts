import { Face } from "../enums/Face";
import { Suit } from "../enums/Suits";

export class Card {
    suit: Suit;
    face: Face;

    constructor(suit: Suit, face: Face) {
        this.suit = suit;
        this.face = face;
    }
}