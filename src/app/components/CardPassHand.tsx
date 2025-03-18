import { Button } from '@mui/material';
import '../card-styles/cards.css';
import { Card as CardModel } from '../classes/Card';
import { Player } from '../classes/Player';
import PassingCard from './PassingCard';

type Props = {
    player: Player;
    passCards: (cards: CardModel[]) => void;
}

export default function CardPassHand({ player, passCards }: Readonly<Props>) {

    function handleCardPass() {
        if (player.cardsPassed.length !== 3) {
            alert("You must pass exactly 3 cards.");
            return;
        }
        passCards(player.cardsPassed);
    }
    return (
        <>
            <ul className="hand">
                {player.hand.map((card, cardIndex) => (
                    <li key={`${cardIndex}-${card.ownerId}`}>
                        <PassingCard cardToPass={card} passedCards={player.cardsPassed} />
                    </li>
                ))
                }
            </ul >
            <Button onClick={handleCardPass}> Pass Cards</Button>
        </>
    );
};