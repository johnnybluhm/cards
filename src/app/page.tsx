'use client';
//https://www.pedroalonso.net/blog/websockets-nextjs-part-1/
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
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
    console.log('shuffled deck', deck.cards);
    setCards([...deck.cards]);
  }

  const rows = [];
  for (let i = 0; i < cards.length; i += 10) {
    rows.push(cards.slice(i, i + 10));
  }

  return (
    <>
      <Button onClick={shuffleDeck}>Shuffle Deck</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((card, cardIndex) => (
                  <TableCell key={cardIndex}>
                    <PlayingCard card={card} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button onClick={shuffleDeck}>Shuffle Deck</Button>
    </>
  );
}