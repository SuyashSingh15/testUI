import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const DialogComponent = ({ open, onConfirm, title = "Confirm", onCancel, okText, cancelText, yesNo = false, hideButtons, children }) => {
    okText = okText ? okText : (yesNo ? 'Yes' : 'Ok');
    cancelText = cancelText ? cancelText : (yesNo ? 'No' : 'Cancel');
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {title}

                {hideButtons && (
                    <IconButton edge="end" color="inherit" onClick={onCancel} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                )}

            </DialogTitle>
            <DialogContent>
                <DialogContentText>{children}</DialogContentText>
            </DialogContent>
            {!hideButtons && (
                <DialogActions>
                    <Button onClick={onCancel} className='DeleteMenuItem'>{cancelText}</Button>
                    <Button onClick={onConfirm} autoFocus className='DeleteMenuItem_okText'>{okText}</Button>
                </DialogActions>
            )}
        </Dialog>
    )
}
export { DialogComponent }
