import React, { useState, useContext } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import WarningIcon from '@mui/icons-material/Warning'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { EntityAction, EntityContext, app, post } from '@List'
import HolismIcon from '../../HolismIcon'

const DeleteAction = ({
    entityType,
    asMenuItem
}) => {

    const [confirmationDialogIsOpen, setConfirmationDialogVisibility] = useState(false)
    const [progress, setProgress] = useState(false)

    const { entity } = useContext(EntityContext)

    const deleteItem = () => {
        setConfirmationDialogVisibility(false)
        setProgress(true)
        post(`${entityType}/delete/${entity.id}`).then(data => {
            app.success("Item is deleted successfully")
            setProgress(false)
            app.emit(app.reloadRequested)
        }, error => {
            app.error(error)
            setProgress(false)
        })
    }

    const confirmationDialog = <Dialog
        open={confirmationDialogIsOpen}
        aria-labelledby="dialog-title"
        TransitionProps={{ onEntered: () => { } }}
    >
        <DialogTitle id="dialog-title">Confirmation</DialogTitle>
        <DialogContent>
            <div className="flex justify-center ">
                <HolismIcon icon={WarningIcon} className="text-red-400 text-5xl my-10" />
            </div>
            <p>
                {app.t('Are you sure you want to delete this item?')}
            </p>
            {/* todo: Show some information form the selected item, to enhance UX */}
        </DialogContent>
        <DialogActions>
            <div id='actions' className='mt-4'>
                <Button variant="outlined" onClick={() => setConfirmationDialogVisibility(false)}>
                    {app.t('No')}
                </Button>
                <Button variant="outlined" className='bg-green-200 ml-2' onClick={() => {
                    deleteItem()
                }}>
                    {app.t('Yes')}
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
                <EntityAction
                    icon={<DeleteIcon style={{ color: '#EF4444' }} />}
                    title={app.t("Delete")}
                    asMenuItem={asMenuItem}
                    click={(e) => {
                        setConfirmationDialogVisibility(true)
                    }}
                />
        }
    </>
}

export default DeleteAction