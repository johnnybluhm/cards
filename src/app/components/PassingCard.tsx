import { useState } from 'react';
import '../card-styles/cards.css';
import { Card as CardModel } from '../classes/Card';
import { Face } from '../enums/Face';
import { Suit } from '../enums/Suits';

type Props = {
    card: CardModel;
    passedCards: CardModel[];
    updateCards: (card: CardModel) => void;
}

export default function PassingCard({ card, passedCards, updateCards }: Readonly<Props>) {
    const [isSelected, setIsSelected] = useState(false);
    function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
        if (passedCards.length === 3) return;
        setIsSelected(!isSelected);
        updateCards(card);
    }
    return (
        isSelected ?
            <strong>
                <a className={`card ${SuitString[card.suit]}`} onClick={handleClick}>
                    <span className="rank">{FaceString[card.face]}</span>
                    <span className="suit">{SuitStringForSpan[card.suit]}</span>
                </a>
            </strong>
            :
            <a className={`card ${SuitString[card.suit]}`} onClick={handleClick}>
                <span className="rank">{FaceString[card.face]}</span>
                <span className="suit">{SuitStringForSpan[card.suit]}</span>
            </a>

    );
};

const FaceString = {
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

const SuitString = {
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