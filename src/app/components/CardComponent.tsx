import React from 'react';
import '../styles/card.css';
import { Card as CardModel } from '../classes/Card';
import { Face } from '../enums/Face';
import { Suit } from '../enums/Suits';
type Props = {
    card: CardModel;
}

export default function Card({ card }: Readonly<Props>) {
    return (
        <div className="card">
            {FaceString[card.face]} {SuitString[card.suit]}
        </div>
    );
};

const FaceString = {
    [Face.Ace]: "Ace",
    [Face.Two]: "Two",
    [Face.Three]: "Three",
    [Face.Four]: "Four",
    [Face.Five]: "Five",
    [Face.Six]: "Six",
    [Face.Seven]: "Seven",
    [Face.Eight]: "Eight",
    [Face.Nine]: "Nine",
    [Face.Ten]: "Ten",
    [Face.Jack]: "Jack",
    [Face.Queen]: "Queen",
    [Face.King]: "King"
};

const SuitString = {
    [Suit.Hearts]: "♡",
    [Suit.Diamonds]: "♢",
    [Suit.Clubs]: "♣",
    [Suit.Spades]: "♠"
};