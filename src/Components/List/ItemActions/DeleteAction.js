import { ItemAction } from '@List';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { post } from '@List';
import { app } from '@List';
import CircularProgress from '@mui/material/CircularProgress';

const DeleteAction = ({ entityType, item, asMenuItem }) => {

    const [confirmationDialogIsOpen, setConfirmationDialogVisibility] = useState(false);
    const [progress, setProgress] = useState(false);

    const deleteItem = () => {
        setConfirmationDialogVisibility(false);
        setProgress(true);
        post(`${entityType}/delete/${item.id}`).then(data => {
            app.success("Item is deleted successfully");
            setProgress(false);
            app.emit(app.reloadRequested);
        }, error => {
            app.error(error);
            setProgress(false);
        });
    }

    const confirmationDialog = <Dialog
        open={confirmationDialogIsOpen}
        aria-labelledby="dialog-title"
        TransitionProps={{ onEntered: () => { } }}
    >
        <DialogTitle id="dialog-title">Confirmation</DialogTitle>
        <DialogContent>
            <p>
                Are you sure you want to delete this item?
            </p>
            {/* todo: Show some information form the selected item, to enhance UX */}
        </DialogContent>
        <DialogActions>
            <div id='actions' className='mt-4'>
                <Button variant="outlined" onClick={() => setConfirmationDialogVisibility(false)}>
                    No
                </Button>
                <Button variant="outlined" className='bg-green-200 ml-2' onClick={() => {
                    deleteItem();
                }}>
                    Yes
                </Button>
            </div>
        </DialogActions>
    </Dialog>

    return <>
        {confirmationDialog}
        {
            progress
                ?
                <CircularProgress size={24} className="m-2" />
                :
                <ItemAction
                    icon={<DeleteIcon style={{ color: '#EF4444' }} />}
                    title={app.t("Delete")}
                    asMenuItem={asMenuItem}
                    click={(e) => {
                        setConfirmationDialogVisibility(true);
                    }}
                />
        }
    </>
}

export default DeleteAction;