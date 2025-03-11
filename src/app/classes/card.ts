import { Face } from "../enums/Face";
import { Suit } from "../enums/Suits";

export class Card {
    suit: Suit;
    face: Face;
    ownerId?: string;

    constructor(suit: Suit, face: Face) {
        this.suit = suit;
        this.face = face;
    }

    addOwner(ownerId: string): void {
        this.ownerId = ownerId;
    }

    removeOwner(): void {
        this.ownerId = undefined;
    }
}