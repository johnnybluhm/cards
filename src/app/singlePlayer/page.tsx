'use client';

import { Button } from "@mui/material";
import SinglePlayer from "../components/SinglePlayer";
import { useRouter } from "next/navigation";

export default function SinglePlayerPage() {
    const router = useRouter();
    return (
        <>
            <div>
                <h3> Play Hearts</h3 >
                <Button variant="contained" color="secondary" onClick={() => router.push('/')}>
                    Multi Player
                </Button>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
            <SinglePlayer />
        </>
    );
}