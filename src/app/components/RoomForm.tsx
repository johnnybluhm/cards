import { Button, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { useState } from 'react';
import useErrorSnackbar from '../hooks/useErrorSnackBar';

interface RoomFormProps {
    onSubmit: (joinRoom: string, createRoom: string) => void;
}

const RoomForm: React.FC<RoomFormProps> = ({ onSubmit, existingRooms }) => {
    existingRooms = ['Room 1', 'Room 2', 'Room 3'];
    const { setError, ErrorSnackBar } = useErrorSnackbar();
    const [rooms, setRooms] = useState(existingRooms);
    const [age, setAge] = React.useState('');

    const [isJoinRoom, setIsJoinRoom] = useState(false);


    const [roomName, setRoomName] = useState('');
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (rooms.includes(roomName)) {
            setError('Room already exists');
            return;
        }
        setRooms([...rooms, roomName]);
        //createRoom with roomName
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event)
        setIsJoinRoom(!isJoinRoom);
    };


    const handleAgeChange = (event: SelectChangeEvent) => {
        setRoomName(event.target.value as string);
        setIsJoinRoom(true);
        setAge(event.target.value as string);
    };
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setRoomName(event.target.value);
    }
    console.log('roomName', roomName);
    console.log('age', age);
    return (
        <>
            <ErrorSnackBar />
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                    <FormLabel id="demo-radio-buttons-group-label">Room</FormLabel>
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
                    <br />
                    <br />
                    {isJoinRoom && <>
                        <Select
                            value={age}
                            label="Join Room"
                            onChange={handleAgeChange}
                        >
                            {rooms.map((room) => (
                                <MenuItem key={room} value={room}>
                                    {room}
                                </MenuItem>
                            ))
                            }
                        </Select>
                        <Button onClick={() => console.log('Join Room')} variant="contained" color="primary">
                            Join Room
                        </Button>
                    </>}

                    {!isJoinRoom &&
                        <>
                            <TextField
                                label="Create Room"
                                variant="outlined"
                                fullWidth
                                name="username"
                                value={roomName}
                                onChange={handleChange}
                                required
                            />
                            <Button type="submit" variant="contained" color="primary">
                                Create Room
                            </Button>
                        </>}
                </FormControl>
            </form>
        </>
    );
};

export default RoomForm;
