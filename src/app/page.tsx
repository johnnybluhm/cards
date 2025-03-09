'use client';
//https://www.pedroalonso.net/blog/websockets-nextjs-part-1/
import { Button } from '@mui/material';
import { useState } from 'react';
import './card-styles/cards.css';
import { Card } from './classes/Card';
import { Deck } from './classes/Deck';
import Hand from './components/HandComponent';
import Grid from '@mui/material/Grid2';
const deck = new Deck();

export default function Home() {
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

  return (
    <div className="playingCards fourColours simpleCards">
      <h3>Play Hearts</h3>
      <br />
      <br />
      <Grid container spacing={2}>
        <Grid size={8}>
          <Hand cards={cards.slice(0, 13)} />
        </Grid>
        <Grid size={4}>
          <Hand cards={cards.slice(13, 26)} />
        </Grid>
        <Grid size={4}>
          <Hand cards={cards.slice(26, 39)} />
        </Grid>
        <Grid size={8}>
          <Hand cards={cards.slice(39, 52)} />
        </Grid>
      </Grid>

      <Button onClick={shuffleDeck}>Shuffle Deck</Button>
      <Button onClick={sortDeck}>Sort Deck</Button>
    </div >
  );
}