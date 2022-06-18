import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import MuiDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { app } from '../../Base/App'

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
        onClose={() => typeof isOpen === 'boolean' ? null : setOpen(false)}
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
                    <>
                        <Button
                            className={"ml-2 bg-green-200 text-gray-900 border-gray-400 "}
                            onClick={() => {
                                if (typeof isOpen !== 'boolean') {
                                    setOpen(false)
                                }
                                if (onClosed && typeof onClosed === 'function') {
                                    onClosed()
                                }
                            }}
                        >
                            {app.t('Ok')}
                        </Button>
                    </>
            }
        </DialogActions>
    </MuiDialog>
}

export default Dialog;
export { Dialog }