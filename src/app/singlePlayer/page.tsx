'use client';

import { Box, Button, Slider } from "@mui/material";
import SinglePlayer from "../components/SinglePlayer";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SinglePlayerPage() {
    const router = useRouter();

    const [sliderValue, setSliderValue] = useState(50);

    // @ts-expect-error idk how to fix the type error lol
    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
    };
    return (
        <>
            <div>
                <h3> Play Hearts</h3 >
                <br></br>
                <Button variant="contained" color="secondary" onClick={() => router.push('/')}>
                    Multi Player
                </Button>
                <br></br>
                <br></br>
                <Box sx={{ width: 300 }}>
                    <h3>Animation speed</h3>
                    <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" onChange={handleSliderChange} />
                </Box>
            </div>
            <SinglePlayer animationSpeed={sliderValue} />
        </>
    );
}