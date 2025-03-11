import { Deck } from "../src/app/classes/Deck";
import { Card } from "../src/app/classes/Card";
import { Suit } from "../src/app/enums/Suits";
import { Face } from "../src/app/enums/Face";

let deck: Deck;
describe('Deck', () => {

    beforeEach(() => {
        deck = new Deck();
    });

    test('should initialize with 52 cards', () => {
        expect(deck.cards.length).toBe(52);
    });

    test('should contain all suits and faces', () => {
        const suits = [Suit.Hearts, Suit.Diamonds, Suit.Clubs, Suit.Spades];
        const faces = [Face.Two, Face.Three, Face.Four, Face.Five, Face.Six, Face.Seven, Face.Eight, Face.Nine, Face.Ten, Face.Jack, Face.Queen, Face.King, Face.Ace];

        for (const suit of suits) {
            for (const face of faces) {
                expect(deck.cards).toContainEqual(new Card(face, suit));
            }
        }
    });

    test('should shuffle the deck', () => {
        const originalOrder = [...deck.cards];
        deck.shuffle();
        expect(deck.cards).not.toEqual(originalOrder);
    });

    test('new deck has no owners', () => {
        expect(deck.cards.every(card => card.ownerId === undefined)).toBe(true);
    });
});
