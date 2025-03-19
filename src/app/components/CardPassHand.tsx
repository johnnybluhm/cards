import { Button } from '@mui/material';
import '../card-styles/cards.css';
import { Card as CardModel } from '../classes/Card';
import { Player } from '../classes/Player';
import PassingCard from './PassingCard';
import { useState } from 'react';
import { sortHand } from './HandComponent';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PassType } from '../classes/Game';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
type Props = {
    player: Player;
    passCards: (cards: CardModel[]) => void;
    passType: PassType
}

export default function CardPassHand({ player, passCards, passType }: Readonly<Props>) {
    sortHand(player.hand);
    const [cardsPassed, setCardsPassed] = useState(player.cardsPassed);
    function handleCardPass() {
        passCards(cardsPassed);
    }
    return (
        <>
            {passType === PassType.Left && <ArrowBackIcon sx={{
                color: 'black',
                fontSize: 200,
                marginLeft: 18
            }} onClick={() => { }} />}
            {passType === PassType.Across && <ArrowUpwardIcon sx={{
                color: 'black',
                fontSize: 200,
                marginLeft: 18
            }} onClick={() => { }} />}
            {passType === PassType.Right && <ArrowForwardIcon sx={{
                color: 'black',
                fontSize: 200,
                marginLeft: 18
            }} onClick={() => { }} />}
            <ul className="hand">
                {player.hand.map((card, cardIndex) => (
                    <li key={`${cardIndex}-${card.ownerId}`}>
                        <PassingCard cardToPass={card} passedCards={cardsPassed} setCardsPassed={setCardsPassed} />
                    </li>
                ))
                }
            </ul >

            <Button sx={{
                color: 'black',
                fontSize: 50,
                ':hover': {
                    bgcolor: 'primary.main', // theme.palette.primary.main
                    color: 'white',
                }
            }} onClick={handleCardPass}> Pass Cards</Button>
        </>
    );
};