'use client';
//https://www.pedroalonso.net/blog/websockets-nextjs-part-1/
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import '../card-styles/cards.css';
import BotManager from '../classes/BotManager';
import Game, { PassType } from '../classes/Game';
import { Player } from '../classes/Player';
import CardPassHand from './CardPassHand';
import Hand from './HandComponent';
import OpponentHand from './OpponentHand';
import Trick from './TrickComponent';
import useMessageSnackbar from '../hooks/useMessageSnackBar';

const players = [
    new Player("Player 1", "1"),
    new Player("Player 2", "2"),
    new Player("Player 3", "3"),
    new Player("Player 4", "4"),
];
players.forEach(player => player.isBot = true);
players[0].isBot = false;
const game = new Game(players);
game.beginNewRound();
let botManager;

export default function SinglePlayer() {
    const {
        setMessage,
        MessageSnackBar
    } = useMessageSnackbar();
    const [gameState, setGameState] = useState<Game>(game);
    botManager = new BotManager(gameState, setGameState, setMessage);
    const playerIndex = 0;
    const player = gameState?.players[playerIndex] ?? new Player("No Player", "No Id");
    const player2 = gameState?.players[(playerIndex + 1) % game.players.length] ?? { hand: [] };
    const player3 = gameState?.players[(playerIndex + 2) % game.players.length] ?? { hand: [] };
    const player4 = gameState?.players[(playerIndex + 3) % game.players.length] ?? { hand: [] };
    console.log(gameState);
    return (
        <div className="playingCards fourColours">
            <MessageSnackBar />
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

                    {!gameState?.isCardPassingComplete && <p style={{ fontSize: 50 }}>Pass {gameState?.currentPassType}!</p>}
                    <Trick trick={gameState?.round?.currentTrick} />
                </Grid>

                {/*RIGHT*/}
                <Grid size={4}>
                    <OpponentHand numberOfCards={player4.hand.length} />
                </Grid>

                {/*BOTTOM and actual players hand*/}
                <Grid size={5}>
                </Grid>
                <Grid size={4}>
                    {gameState?.isCardPassingComplete ?
                        <Hand cards={player?.hand} updateGame={botManager.updateGame.bind(botManager)} />
                        : <CardPassHand player={player} passCards={botManager.passCards.bind(botManager)} passType={gameState?.currentPassType ?? PassType.NoPass} />
                    }
                </Grid>
                <Grid size={3}>
                </Grid>
            </Grid>
        </div >
    );
}