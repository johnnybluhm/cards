import { useState } from 'react';
import '../card-styles/cards.css';
import { Card as CardModel } from '../classes/Card';
import { Face } from '../enums/Face';
import { Suit } from '../enums/Suits';

type Props = {
    cardToPass: CardModel;
    passedCards: CardModel[];
}

export default function PassingCard({ cardToPass, passedCards }: Readonly<Props>) {
    const [isSelected, setIsSelected] = useState(false);
    function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
        if (passedCards.length === 3) return;
        setIsSelected(!isSelected);
        const index = passedCards.findIndex(passedCard => passedCard.suit === cardToPass.suit && passedCard.face === cardToPass.face);
        if (index > 0) {
            passedCards.splice(index, 1);
            return;
        };
        passedCards.push(cardToPass);
    }
    return (
        isSelected ?
            <strong>
                <a className={`card ${SuitString[cardToPass.suit]}`} onClick={handleClick}>
                    <span className="rank">{FaceString[cardToPass.face]}</span>
                    <span className="suit">{SuitStringForSpan[cardToPass.suit]}</span>
                </a>
            </strong>
            :
            <a className={`card ${SuitString[cardToPass.suit]}`} onClick={handleClick}>
                <span className="rank">{FaceString[cardToPass.face]}</span>
                <span className="suit">{SuitStringForSpan[cardToPass.suit]}</span>
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