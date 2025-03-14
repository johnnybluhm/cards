import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

interface RoomFormProps {
    onSubmit: (joinRoom: string, createRoom: string) => void;
}

const RoomForm: React.FC<RoomFormProps> = ({ onSubmit, existingRooms }) => {
    //existingRooms = ['Room 1', 'Room 2', 'Room 3'];
    const [roomName, setRoomName] = useState('');
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        //createRoom with roomName
    };

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setRoomName(event.target.value);
    }
    console.log('roomName', roomName);
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="RoomName"
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
        </form>
    );
};

export default RoomForm;
