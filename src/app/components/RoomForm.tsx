import { Button, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { useState } from 'react';
import SocketRoom from '../classes/SocketRoom';

interface RoomFormProps {
    createRoom: (roomName: string, password: string, playerName: string) => void;
    joinRoom: (roomName: string, password: string, playerName: string) => void;
    availableRooms: SocketRoom[];
}

const RoomForm: React.FC<RoomFormProps> = ({ createRoom, joinRoom, availableRooms }) => {
    const [selectedRoom, setSelectedRoom] = React.useState('');
    const [isJoinRoom, setIsJoinRoom] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [password, setPassword] = useState('');
    const [playerName, setPlayerName] = useState('');

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (isJoinRoom) {
            joinRoom(roomName, password, playerName);
            return;
        }
        createRoom(roomName, password, playerName);
    };

    function handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (isJoinRoom) {
            setRoomName('');
        }
        setIsJoinRoom(!isJoinRoom);
    };


    function handleRoomOptionChange(event: SelectChangeEvent) {
        setRoomName(event.target.value as string);
        setIsJoinRoom(true);
        setSelectedRoom(event.target.value as string);
    };

    function handleRoomNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setRoomName(event.target.value);
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function handlePlayerNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPlayerName(event.target.value);
    }

    return (
        <Dialog open={true} onClose={() => { }}>
            <DialogTitle>Room Selection</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            row={true}
                            onChange={handleRadioChange}
                            value={isJoinRoom}
                        >
                            <FormControlLabel value={true} control={<Radio />} label="Join Room" />
                            <FormControlLabel value={false} control={<Radio />} label="Create Room" />
                        </RadioGroup>
                        {isJoinRoom &&
                            <FormControl fullWidth>

                                <InputLabel id="select-label">Room Name</InputLabel>
                                <Select
                                    labelId="select-label"
                                    label="Room Name"
                                    value={selectedRoom}
                                    onChange={handleRoomOptionChange}
                                >
                                    {availableRooms?.map((room) => (
                                        <MenuItem key={room.id} value={room.roomName}>
                                            {room.roomName}
                                        </MenuItem>
                                    ))
                                    }
                                </Select>
                                <TextField
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                                <TextField
                                    label="Player Name"
                                    variant="outlined"
                                    fullWidth
                                    value={playerName}
                                    onChange={handlePlayerNameChange}
                                    required
                                />
                                <Button type="submit" variant="contained" color="primary">
                                    Join Room
                                </Button>
                            </FormControl>}

                        {!isJoinRoom &&
                            <>
                                <TextField
                                    label="Room Name"
                                    variant="outlined"
                                    fullWidth
                                    value={roomName}
                                    onChange={handleRoomNameChange}
                                    required
                                />
                                <TextField
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                                <TextField
                                    label="Player Name"
                                    variant="outlined"
                                    fullWidth
                                    value={playerName}
                                    onChange={handlePlayerNameChange}
                                    required
                                />
                                <Button type="submit" variant="contained" color="primary">
                                    Create Room
                                </Button>
                            </>}
                    </FormControl>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default RoomForm;
