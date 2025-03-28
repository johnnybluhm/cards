import { Button } from '@mui/material';
import { useState } from 'react';
import '../card-styles/cards.css';
import { Card as CardModel } from '../classes/Card';
import { PassType } from '../classes/Game';
import { Player } from '../classes/Player';
import { sortHand } from './HandComponent';
import PassingCard from './PassingCard';
type Props = {
    player: Player;
    passCards: (cards: CardModel[]) => void;
    passType?: PassType
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function CardPassHand({ player, passCards, passType }: Readonly<Props>) {
    sortHand(player.hand);
    const [cardsPassed, setCardsPassed] = useState(player.cardsPassed);
    function handleCardPass() {
        passCards(cardsPassed);
    }
    return (
        <>
            <ul className="hand" style={{cursor: 'pointer' }}>
                {player.hand.map((card, cardIndex) => (
                    <li key={`${cardIndex}-${card.ownerId}`} >
                        <PassingCard cardToPass={card} passedCards={cardsPassed} setCardsPassed={setCardsPassed} />
                    </li>
                ))
                }
            </ul >
            <Button variant="contained" sx={{ width: '34em' }} onClick={handleCardPass}> Pass Cards</Button>
        </>
    );
};

/*{passType === PassType.Left && <ArrowBackIcon sx={{
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
            }} onClick={() => { }} />}*/