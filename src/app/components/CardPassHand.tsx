import { Button } from '@mui/material';
import '../card-styles/cards.css';
import { Card as CardModel } from '../classes/Card';
import { Player } from '../classes/Player';
import PassingCard from './PassingCard';
import { useState } from 'react';
import { sortHand } from './HandComponent';

type Props = {
    player: Player;
    passCards: (cards: CardModel[]) => void;
}

export default function CardPassHand({ player, passCards }: Readonly<Props>) {
    sortHand(player.hand);
    const [cardsPassed, setCardsPassed] = useState(player.cardsPassed);
    function handleCardPass() {
        passCards(cardsPassed);
    }
    return (
        <>
            <ul className="hand">
                {player.hand.map((card, cardIndex) => (
                    <li key={`${cardIndex}-${card.ownerId}`}>
                        <PassingCard cardToPass={card} passedCards={cardsPassed} setCardsPassed={setCardsPassed} />
                    </li>
                ))
                }
            </ul >
            <Button onClick={handleCardPass}> Pass Cards</Button>
        </>
    );
};