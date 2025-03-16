import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Player } from '../classes/Player';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState } from 'react';

type Props = {
    open: boolean;
    onRoundCompleted: (isReady: boolean) => void;
    players: Player[];
}

export default function RoundCompleteDialog({ open, players, onRoundCompleted }: Readonly<Props>) {
    const [isReady, setIsReady] = useState(false);

    function handleReadyPress() {
        onRoundCompleted(isReady);
        setIsReady(!isReady);
    }

    return (
        <Dialog open={open} onClose={() => { }}>
            <DialogTitle>Game Summary</DialogTitle>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Player</TableCell>
                                <TableCell align="right">Score</TableCell>
                                <TableCell align="right">Round Points</TableCell>
                                <TableCell align="right">Tricks Won</TableCell>
                                <TableCell align="right">Ready</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {players.map((player) => (
                                <TableRow key={player.id}>
                                    <TableCell component="th" scope="row">
                                        {player.name}
                                    </TableCell>
                                    <TableCell align="center">{player.totalPoints}</TableCell>
                                    <TableCell align="center">{player.roundPoints}</TableCell>
                                    <TableCell align="center">{player.tricksWon.length}</TableCell>
                                    <TableCell align="center"><CheckCircleIcon color={player.isReadyForNextRound ? "success" : "error"} /></TableCell>
                                </TableRow>
                            ))}
                            {players.length < 4 && <TableRow key="waiting">
                                <TableCell align="center">Waiting for more players...</TableCell>

                            </TableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleReadyPress}>Ready</Button>
            </DialogActions>
        </Dialog>
    );
};