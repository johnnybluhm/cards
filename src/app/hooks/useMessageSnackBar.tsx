import { Alert } from '@mui/material';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import * as React from 'react';
import { useCallback, useState } from 'react';
import Message from '../classes/Message';

export default function useMessageSnackbar() {
    const [message, setMessage] = useState<Message | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function handleClose(event: React.SyntheticEvent<Element, Event> | Event, reason?: SnackbarCloseReason) {
        setMessage(null);
    }

    const MessageSnackBar = useCallback(() => {
        return (
            <>
                {message && <Snackbar
                    sx={{ minWidth: 400 }}
                    open={!!message}
                    onClose={handleClose}
                    autoHideDuration={5000}
                >
                    <Alert
                        onClose={handleClose}
                        severity={message.severity}
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {message.content}
                    </Alert>
                </Snackbar>}
            </>
        )
    }, [message]);

    return {
        setMessage,
        MessageSnackBar
    }
}