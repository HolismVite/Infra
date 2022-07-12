import React, { useState, useEffect, useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { DialogContext } from 'Contexts'
import { BrowseContext } from 'Contexts'
import Unify from '../Unify';
import Pagination from '../List/Pagination';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BrowserDialog = () => {

    const {
        open,
        setOpen,
    } = useContext(DialogContext)

    const {
        list
    } = useContext(BrowseContext)

    return <Dialog
        open={open}
        fullScreen
        TransitionComponent={Transition}
        onClose={() => setOpen(false)}
    >
        <DialogTitle
            className="bg-gray-100"
        >
            <div className="flex items-center justify-between">
                <div
                    className="flex gap-4 items-center"
                >
                    <IconButton
                        onClick={() => setOpen(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                    <span className="ml-4">{app.t("Find")}</span>
                </div>
                <div
                    dir='ltr'
                    className="listActions flex-1 flex gap-4"
                >
                    {/* <IconButton
                    onClick={() => setOpen(false)}
                >
                    <CloseIcon />
                </IconButton> */}
                    {/* <IconButton
                    onClick={() => setOpen(false)}
                >
                    <CloseIcon />
                </IconButton>
                <IconButton
                    onClick={() => setOpen(false)}
                >
                    <CachedIcon />
                </IconButton> */}
                </div>
            </div>
        </DialogTitle>
        <DialogContent>
            <Unify component={list} />
        </DialogContent>
        <DialogActions>
            <Pagination />
        </DialogActions>
    </Dialog>
}

export default BrowserDialog