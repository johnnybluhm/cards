import { Dialog, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Player } from '../classes/Player';

type Props = {
    open: boolean;
    onClose: () => void;
    players: Player[];
}

export default function RoundCompleteDialog({ open, players, onClose }: Readonly<Props>) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Round Complete</DialogTitle>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Player</TableCell>
                                <TableCell align="right">Score</TableCell>
                                <TableCell align="right"># of tricks won</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {players.map((player) => (
                                <TableRow key={player.id}>
                                    <TableCell component="th" scope="row">
                                        {player.name}
                                    </TableCell>
                                    <TableCell align="right">{player.totalPoints}</TableCell>
                                    <TableCell align="right">{player.tricksWon.length}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
        </Dialog>
    );
};