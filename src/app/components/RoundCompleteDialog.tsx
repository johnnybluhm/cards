import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Player } from '../classes/Player';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type Props = {
    open: boolean;
    onRoundCompleted: () => void;
    players: Player[];
}

export default function RoundCompleteDialog({ open, players, onRoundCompleted }: Readonly<Props>) {
    /*players = [new Player('Player 1', '1'), new Player('Player 2', '2'), new Player('Player 3', '3'), new Player('Player 4', '4')];

    players[2].isReadyForNextRound = true;
    players[1].isReadyForNextRound = true;*/
    return (
        <Dialog open={open} onClose={() => { }}>
            <DialogTitle>Round Complete</DialogTitle>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Player</TableCell>
                                <TableCell align="right">Score</TableCell>
                                <TableCell align="right">Round points</TableCell>
                                <TableCell align="right"># of tricks won</TableCell>
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
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={onRoundCompleted}>Ready</Button>
            </DialogActions>
        </Dialog>
    );
};