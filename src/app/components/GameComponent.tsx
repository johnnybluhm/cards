'use client';
//https://www.pedroalonso.net/blog/websockets-nextjs-part-1/
import Grid from '@mui/material/Grid2';
import '../card-styles/cards.css';
import { Card } from '../classes/Card';
import Game from '../classes/Game';
import Hand from './HandComponent';
import OpponentHand from './OpponentHand';
import Trick from './TrickComponent';

type Props = {
    game?: Game | undefined;
    updateGame: (cardPlayed: Card) => void;
    socketId?: string;
}

export default function GameComponent({ game, updateGame, socketId }: Readonly<Props>) {
    const playerIndex = game?.players.findIndex(player => player.id === socketId) ?? 0;
    const player = game?.players[playerIndex] ?? { hand: [] };
    const player2 = game?.players[(playerIndex + 1) % game.players.length] ?? { hand: [] };
    const player3 = game?.players[(playerIndex + 2) % game.players.length] ?? { hand: [] };
    const player4 = game?.players[(playerIndex + 3) % game.players.length] ?? { hand: [] };

    return (
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
                    <Trick trick={game?.round?.currentTrick} />
                </Grid>

                {/*RIGHT*/}
                <Grid size={4}>
                    <OpponentHand numberOfCards={player4.hand.length} />
                </Grid>

                {/*BOTTOM and actual players hand*/}
                <Grid size={5}>
                </Grid>
                <Grid size={4}>
                    <Hand cards={player?.hand} updateGame={updateGame} />
                </Grid>
                <Grid size={3}>
                </Grid>
            </Grid>
        </div >
    );
}