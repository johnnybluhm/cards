import React from 'react';
import '../styles/card.css';
import { Card as CardModel } from '../classes/Card';
import { Face } from '../enums/Face';
import { Suit } from '../enums/Suits';
import { Card } from '@mui/material';
type Props = {
    card: CardModel;
}


export default function PlayingCard({ card }: Readonly<Props>) {
    return (
        <Card variant='outlined' className="card">
            <div className="grid-container">
                <div className="grid-item top-left">Top Left</div>
                <div className="grid-item top-right">Top Right</div>
                <div className="grid-item bottom-left">Bottom Left</div>
                <div className="grid-item bottom-right">Bottom Right</div>
                <div className="grid-item center">Center</div>
            </div>
        </Card>

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
    [Suit.Hearts]: "♡",
    [Suit.Diamonds]: "♢",
    [Suit.Clubs]: "♣",
    [Suit.Spades]: "♠"
};

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