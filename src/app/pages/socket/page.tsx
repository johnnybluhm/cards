'use client';
//https://www.pedroalonso.net/blog/websockets-nextjs-part-1/
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useState } from 'react';
import { Card } from '../../classes/Card';
import { Deck } from '../../classes/Deck';
import PlayingCard from '../../components/CardComponent';
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
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <h1 className="text-4xl font-bold">WebSocket Test</h1>
                <Button
                    onClick={joinRoom}
                >Join Room</Button>

                <p>You are in room {room}</p>
            </>

            )
            
}