import React from 'react';
import '../styles/card.css';
import { Card as CardModel } from '../classes/Card';

type Props = {
    card: CardModel;
}

export default function Card({ card }: Readonly<Props>) {
    return (
        <div className="card">
            {card.face} {card.suit}
        </div>
    );
};