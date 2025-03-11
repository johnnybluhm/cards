import { UUID } from "crypto";
import { Face } from "../enums/Face";
import { Suit } from "../enums/Suits";

export class Card {
    suit: Suit;
    face: Face;
    ownerId?: UUID;

    constructor(suit: Suit, face: Face) {
        this.suit = suit;
        this.face = face;
    }

    addOwner(ownerId: UUID) {
        this.ownerId = ownerId;
    }

    removeOwner() {
        this.ownerId = undefined;
    }
}