'use client';
//https://www.pedroalonso.net/blog/websockets-nextjs-part-1/
import { Button } from '@mui/material';
import { useState } from 'react';
import { Card } from './classes/Card';
import { Deck } from './classes/Deck';
import PlayingCard from './components/CardComponent';
const deck = new Deck();
export default function Home() {
  const [cards, setCards] = useState<Card[]>(deck.cards);

  console.log('in component deck:', deck.cards);
  function shuffleDeck() {
    deck.shuffle();
    console.log('shuffled deck', deck.cards)
    setCards([...deck.cards]);
  }

  return (
    <>
      {cards.map((card, cardIndex) => (
        <PlayingCard key={cardIndex} card={card} />
      ))}

      <Button onClick={shuffleDeck}>Shuffle Deck</Button>
    </>

  );
}