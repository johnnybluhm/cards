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
const deck = new Deck();

export default function Game() {
    const [cards, setCards] = useState<Card[]>(deck.cards);

    console.log('in component deck:', deck.cards);

    function shuffleDeck() {
        deck.shuffle();
        console.log('shuffled deck', deck.cards);
        setCards([...deck.cards]);
    }

    function sortDeck() {
        deck.sort();
        console.log('sorted deck', deck.cards);
        setCards([...deck.cards]);
    }
    const trick = new CardTrick();
    trick.addCard(cards[0], cards.slice(0, 13));
    trick.addCard(cards[1], cards.slice(0, 13));
    trick.addCard(cards[2], cards.slice(0, 13));
    trick.addCard(cards[3], cards.slice(0, 13));
    return (
        <>

            <div className="playingCards fourColours" style={{ backgroundColor: 'green' }}>

                <Grid container spacing={2}>

                    {/*TOP*/}
                    <Grid size={5}>
                    </Grid>
                    <Grid size={4}>
                        <Hand cards={cards.slice(0, 13)} faceDown={true} />
                    </Grid>
                    <Grid size={3}>
                    </Grid>

                    {/*LEFT*/}
                    <Grid size={2}>

                    </Grid>
                    <Grid size={4}>
                        <Hand cards={cards.slice(13, 26)} faceDown={true} />
                    </Grid>
                    <Grid size={2}>
                        <Trick trick={trick} />
                    </Grid>

                    {/*RIGHT*/}
                    <Grid size={4}>
                        <Hand cards={cards.slice(26, 39)} faceDown={true} />
                    </Grid>

                    {/*BOTTOM and actual players hand*/}
                    <Grid size={5}>
                    </Grid>
                    <Grid size={4}>
                        <Hand cards={cards.slice(39, 52)} />
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