import { Button } from '@mui/material'; // Import div from @mui/material
import '../card-styles/cards.css';
import { Card as CardModel } from '../classes/Card';
import { Face } from '../enums/Face';
import { Suit } from '../enums/Suits';

type Props = {
    card: CardModel;
}

export default function PlayingCard({ card }: Readonly<Props>) {
    console.log(`&${SuitString[card.suit]};`)
    return (
        <div className="playingCards fourColours">
            <div className={`card rank-${FaceString[card.face].toLocaleLowerCase()} ${SuitString[card.suit]}`} onClick={() => console.log(SuitString[card.suit])}>
                <span className="rank">{FaceString[card.face]}</span>
                <span className="suit"></span>
            </div>
        </div >
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
    [Face.Ten]: "10",
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
    [Suit.Hearts]: "&hearts;",
    [Suit.Diamonds]: "&diams;",
    [Suit.Clubs]: "&clubs;",
    [Suit.Spades]: "&spades;"
}

const getColor = (suit: Suit): string => {
    if (suit === Suit.Hearts) {
        return "red";
    }
    else if (suit === Suit.Clubs) {
        return "green";
    }
    else if (suit === Suit.Spades) {
        return "black";
    }
    else if (suit === Suit.Diamonds) {
        return "blue";
    }
    throw new Error("Invalid suit");
}