import { Alert } from '@mui/material';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import * as React from 'react';
import { useCallback, useState } from 'react';

export default function useErrorSnackbar() {
    const [error, setError] = useState<string | null>(null);

    function handleClose(event: React.SyntheticEvent<Element, Event> | Event, reason?: SnackbarCloseReason) {
        setError(null);
    }

    const ErrorSnackBar = useCallback(() => {
        return (
            <>
                {error && <Snackbar
                    sx={{ minWidth: 400 }}
                    open={!!error}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    message={error}
                >
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>}
            </>
        )
    }, [error]);

    return {
        setError,
        ErrorSnackBar
    }
}