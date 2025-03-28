'use client';
//https://www.pedroalonso.net/blog/websockets-nextjs-part-1/
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import '../card-styles/cards.css';
import '../card-styles/grid.css'; // Import the grid CSS for MUI Grid2
import BotManager from '../classes/BotManager';
import Game, { PassType } from '../classes/Game';
import { Player } from '../classes/Player';
import CardPassHand from './CardPassHand';
import Hand from './HandComponent';
import OpponentHand from './OpponentHand';
import Trick from './TrickComponent';
import useMessageSnackbar from '../hooks/useMessageSnackBar';
import RoundCompleteDialog from './RoundCompleteDialog';

const players = [
    new Player("Player 1", "1"),
    new Player("Player 2", "2"),
    new Player("Player 3", "3"),
    new Player("Player 4", "4"),
];
players.forEach(player => player.isBot = true);
players[0].isBot = false;
const game = new Game(players);
game.players.forEach(player => player.isReadyForNextRound = true);
game.players[0].isReadyForNextRound = false;
game.round.isComplete = true;
let botManager;
type Props = {
    animationSpeed: number;
}
export default function SinglePlayer({ animationSpeed }: Props) {
    const {
        setMessage,
        MessageSnackBar
    } = useMessageSnackbar();

    useEffect(() => {
    }, []);


    const [gameState, setGameState] = useState<Game>(game);
    botManager = new BotManager(gameState, setGameState, setMessage);
    const playerIndex = 0;
    const player = gameState?.players[playerIndex] ?? new Player("No Player", "No Id");
    const player2 = gameState?.players[(playerIndex + 1) % game.players.length] ?? { hand: [] };
    const player3 = gameState?.players[(playerIndex + 2) % game.players.length] ?? { hand: [] };
    const player4 = gameState?.players[(playerIndex + 3) % game.players.length] ?? { hand: [] };
    botManager.updateAnimationSpeed(animationSpeed);
    return (
        <div className="playingCards fourColours">
            <MessageSnackBar />
            <RoundCompleteDialog
                open={gameState?.round?.isComplete ?? false}
                players={gameState?.players ?? []}
                onRoundCompleted={botManager.completeRound.bind(botManager)} />
            <div className="container">
                <div className="topPlayer" style={{ background: 'white', paddingLeft: '4em' }}>
                    <OpponentHand numberOfCards={player3.hand.length} />
                </div>
                <div className="leftPlayer" style={{ background: 'blue', rotate: '270deg', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <OpponentHand numberOfCards={player2.hand.length} shouldBeVertical={true} />
                </div>

                <div className="trickArea" style={{ background: 'yellow' }}>
                    {!gameState?.isCardPassingComplete && <p style={{ fontSize: 50 }}>Pass {gameState?.currentPassType}!</p>}
                    <Trick trick={gameState?.round?.currentTrick} />
                </div>


                <div className="rightPlayer" style={{ background: 'green', rotate: '-90deg', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <OpponentHand numberOfCards={player4.hand.length} shouldBeVertical={true} />
                </div>

                {/*BOTTOM and actual players hand*/}
                <div className="bottomPlayer" style={{ background: 'purple', paddingLeft: '4em' }}>
                    {gameState?.isCardPassingComplete ?
                        <Hand cards={player?.hand} updateGame={botManager.updateGame.bind(botManager)} />
                        : <CardPassHand player={player} passCards={botManager.passCards.bind(botManager)} passType={gameState?.currentPassType ?? PassType.NoPass} />
                    }
                </div>

            </div>
        </div >
    );
}