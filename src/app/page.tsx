'use client';
//https://www.pedroalonso.net/blog/websockets-nextjs-part-1/
import { Button, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useState } from 'react';
import './card-styles/cards.css';
import { Card } from './classes/Card';
import { Deck } from './classes/Deck';
import PlayingCard from './components/CardComponent';
const deck = new Deck();

export default function Home() {
  const [cards, setCards] = useState<Card[]>(deck.cards);

  console.log('in component deck:', deck.cards);

  function shuffleDeck() {
    deck.shuffle();
    console.log('shuffled deck', deck.cards);
    setCards([...deck.cards]);
  }

  return (
    <>
      <Button onClick={shuffleDeck}>Shuffle Deck</Button>

      <div className="playingCards">
        <ul className="table">
          {cards.map((card, cardIndex) => (
            < li key={cardIndex}>
              <PlayingCard card={card} />
            </li>

          ))}
        </ul >
      </div>
    </>
  );
}