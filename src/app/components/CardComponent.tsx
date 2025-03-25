import '../card-styles/cards.css';
import { Card as CardModel } from '../classes/Card';
import { Face } from '../enums/Face';
import { Suit } from '../enums/Suits';

type Props = {
    card: CardModel;
    updateGame: (cardPlayed: CardModel) => void;
}

export default function PlayingCard({ card, updateGame }: Readonly<Props>) {
    return (
        <a className={`card ${SuitString[card.suit]}`} onClick={() => updateGame(card)}>
            <span className="rank">{FaceString[card.face]}</span>
            <span className="suit">{SuitStringForSpan[card.suit]}</span>
        </a>
    );
};

export const FaceString = {
    [Face.Ace]: "A",
    [Face.Two]: "2",
    [Face.Three]: "3",
    [Face.Four]: "4",
    [Face.Five]: "5",
    [Face.Six]: "6",
    [Face.Seven]: "7",
    [Face.Eight]: "8",
    [Face.Nine]: "9",
    [Face.Ten]: "T",
    [Face.Jack]: "J",
    [Face.Queen]: "Q",
    [Face.King]: "K"
};

export const SuitString = {
    [Suit.Hearts]: "hearts",
    [Suit.Diamonds]: "diams",
    [Suit.Clubs]: "clubs",
    [Suit.Spades]: "spades"
};

const SuitStringForSpan = {
    [Suit.Hearts]: "♥",
    [Suit.Diamonds]: "♦",
    [Suit.Clubs]: "♣",
    [Suit.Spades]: "♠"
};