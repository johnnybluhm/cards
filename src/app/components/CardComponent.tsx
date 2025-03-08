import React from 'react';
import '../styles/card.css';
import { Card as CardModel } from '../classes/Card';
import { Face } from '../enums/Face';
import { Suit } from '../enums/Suits';
import { Card } from '@mui/material'; // Import Grid from @mui/material
import Grid from '@mui/material/Grid2';

type Props = {
    card: CardModel;
}


export default function PlayingCard({ card }: Readonly<Props>) {
    return (
        <Card variant='outlined' className="card">
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid size={4} >Top Left</Grid>
                <Grid size={4}></Grid>
                <Grid size={4}>Top Right</Grid>
                <Grid size={4}></Grid>
                <Grid size={4} >Center</Grid>
                <Grid size={4}></Grid>
                <Grid size={4} >Bottom Left</Grid>
                <Grid size={4}></Grid>
                <Grid size={4} >Bottom Right</Grid>
            </Grid>
        </Card>

    );
};

const FaceString = {
    [Face.Ace]: "A",
    [Face.Two]: "2",
    [Face.Three]: "3",
    [Face.Four]: "4",
    [Face.Five]: "5",
    [Face.Six]: "6",
    [Face.Seven]: "7",
    [Face.Eight]: "8",
    [Face.Nine]: "9",
    [Face.Ten]: "T",
    [Face.Jack]: "J",
    [Face.Queen]: "Q",
    [Face.King]: "K"
};

const SuitString = {
    [Suit.Hearts]: "♡",
    [Suit.Diamonds]: "♢",
    [Suit.Clubs]: "♣",
    [Suit.Spades]: "♠"
};

const getColor = (suit: Suit): string => {
    if (suit === Suit.Hearts) {
        return "red";
    }
    else if (suit === Suit.Clubs) {
        return "green";
    }
    else if (suit === Suit.Spades) {
        return "black";
    }
    else if (suit === Suit.Diamonds) {
        return "blue";
    }
    throw new Error("Invalid suit");
}