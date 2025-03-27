'use client';
//https://www.pedroalonso.net/blog/websockets-nextjs-part-1/
import Grid from '@mui/material/Grid2';
import '../card-styles/cards.css';
import { Card } from '../classes/Card';
import Game, { PassType } from '../classes/Game';
import { Player } from '../classes/Player';
import CardPassHand from './CardPassHand';
import Hand from './HandComponent';
import OpponentHand from './OpponentHand';
import Trick from './TrickComponent';

type Props = {
    game: Game | null;
    updateGame: (cardPlayed: Card) => void;
    passCards: (cards: Card[]) => void;
    socketId?: string;
}

export default function GameComponent({ game, updateGame, passCards, socketId }: Readonly<Props>) {
    const playerIndex = game?.players.findIndex(player => player.id === socketId) ?? 0;
    const player = game?.players[playerIndex] ?? new Player("No Player", "No Id");
    const player2 = game?.players[(playerIndex + 1) % game.players.length] ?? { hand: [] };
    const player3 = game?.players[(playerIndex + 2) % game.players.length] ?? { hand: [] };
    const player4 = game?.players[(playerIndex + 3) % game.players.length] ?? { hand: [] };
    return (
        <div className="playingCards fourColours">

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

                    {!game?.isCardPassingComplete && <p style={{ fontSize: 50, justifyContent:'center' }}>Pass {game?.currentPassType}!</p>}
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
                    {game?.isCardPassingComplete ?
                        <Hand cards={player?.hand} updateGame={updateGame} />
                        : <CardPassHand player={player} passCards={passCards} passType={game?.currentPassType ?? PassType.NoPass} />
                    }
                </Grid>
                <Grid size={3}>
                </Grid>
            </Grid>
        </div >
    );
}