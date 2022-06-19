import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import MuiDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { app } from '../../Base/App'
import { PrimaryAction } from './PrimaryAction';

const Dialog = ({
    title,
    content,
    isOpen,
    actions,
    large,
    tiny,
    onEntered,
    onClosed
}) => {

    return <MuiDialog
        open={isOpen}
        onClose={() => onClosed instanceof Function && onClosed(false)}
        aria-labelledby="dialogTitle"
        id="dialog"
        fullWidth
        maxWidth={large ? 'md' : (tiny ? 'xs' : 'sm')}
        TransitionProps={{
            onEntered: onEntered
        }}
    >
        <DialogTitle id="dialogTitle">{app.t(title)}</DialogTitle>
        <DialogContent>
            {
                typeof content === 'string'
                    ?
                    <DialogContentText id="dialogContent">
                        {content}
                    </DialogContentText>
                    :
                    content
            }
        </DialogContent>
        <DialogActions>
            {
                actions
                    ?
                    actions
                    :
                    <PrimaryAction
                        text='Ok'
                        click={() => {
                            if (typeof isOpen !== 'boolean') {
                                setOpen(false)
                            }
                            if (onClosed instanceof Function) {
                                onClosed()
                            }
                        }}
                    />
            }
        </DialogActions>
    </MuiDialog>
}

export default Dialog;
export { Dialog }