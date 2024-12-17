import React, { useState, useContext, createContext } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert';

const SnackbarContext = createContext(null);

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarProvider = ({ children }) => {
    const [message, setMessage] = useState(null);
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState(null);
    const [handleAction, setHandleAction] = useState(null);

    const showMessage = function (title, message, severity = "info", onAction) {
        if (typeof title !== 'string') {
            title = title.toString();
        }
        if (message && typeof message !== 'string') {
            message = message.toString();
        }
        setMessage(message ? `${title}: ${message}` : title);
        setSeverity(severity);
        setOpen(true);
        setHandleAction(onAction);
    }

    const showError = function (title, message, severity = "error", onAction) {
        showMessage(title, message, severity, onAction);
    }

    const handleClose = function () {
        setOpen(false);
        setHandleAction(null);
        if (handleAction) {
            handleAction()
        }
    }

    return (
        <>
            <SnackbarContext.Provider
                value={{ showMessage, showError }}
            >
                {children}
            </SnackbarContext.Provider>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity={severity}>{message}</Alert>
            </Snackbar>
        </>
    )
}

const useSnackbar = function () {
    return useContext(SnackbarContext)
}

export { SnackbarProvider, SnackbarContext, useSnackbar }