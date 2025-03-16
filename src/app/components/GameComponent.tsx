'use client';
//https://www.pedroalonso.net/blog/websockets-nextjs-part-1/
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import '../card-styles/cards.css';
import { Card } from '../classes/Card';
import { Deck } from '../classes/Deck';
import Hand from './HandComponent';
import Trick from './TrickComponent';
import { Trick as CardTrick } from '../classes/Trick';
import OpponentHand from './OpponentHand';
import Game from '../classes/Game';
const deck = new Deck();

type Props = {
    game: Game;
    updateGame: (cardPlayed: Card) => void;
    socketId: string;
}

export default function GameComponent({ game, updateGame, socketId }: Readonly<Props>) {
    const [cards, setCards] = useState<Card[]>(deck.cards);

    const playerIndex = game.players.findIndex(player => player.id === socketId);

    const player = game.players[playerIndex];
    const player2 = game.players[(playerIndex + 1) % game.players.length];
    const player3 = game.players[(playerIndex + 2) % game.players.length];
    const player4 = game.players[(playerIndex + 3) % game.players.length];


    console.log('in component deck:', deck.cards);

    function shuffleDeck() {
        deck.shuffle();
        setCards([...deck.cards]);
    }

    function sortDeck() {
        deck.sort();
        setCards([...deck.cards]);
    }

    return (
        <>

            <div className="playingCards fourColours" style={{ backgroundColor: 'green' }}>

                <Grid container spacing={2}>

                    {/*TOP*/}
                    <Grid size={5}>
                    </Grid>
                    <Grid size={4}>
                        <OpponentHand numberOfCards={player3.hand.length} />
                    </Grid>
                    <Grid size={3}>
                    </Grid>

                    {/*LEFT*/}
                    <Grid size={2}>

                    </Grid>
                    <Grid size={4}>
                        <OpponentHand numberOfCards={player2.hand.length} />
                    </Grid>
                    <Grid size={2}>
                        <Trick trick={game.round.currentTrick} />
                    </Grid>

                    {/*RIGHT*/}
                    <Grid size={4}>
                        <OpponentHand numberOfCards={player4.hand.length} />
                    </Grid>

                    {/*BOTTOM and actual players hand*/}
                    <Grid size={5}>
                    </Grid>
                    <Grid size={4}>
                        <Hand cards={player.hand} />
                    </Grid>
                    <Grid size={3}>
                    </Grid>
                </Grid>
            </div >
            <Button onClick={shuffleDeck}>Shuffle Deck</Button>
            <Button onClick={sortDeck}>Sort Deck</Button>
        </>
    );
}