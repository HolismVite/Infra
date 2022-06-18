import React, { useState, useContext } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import WarningIcon from '@mui/icons-material/Warning'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { EntityAction, EntityContext, app, post } from '@List'
import HolismIcon from '../../HolismIcon'
import Dialog from '../../../Components/Dialog/Dialog'
import { OkCancel } from '../../../Components/Dialog/OkCancel'

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
            // app.emit(app.reloadRequested)
        }, error => {
            app.error(error)
            setProgress(false)
        })
    }

    const confirmationDialog = <Dialog
        tiny
        isOpen={confirmationDialogIsOpen}
        title={app.t('Confirmation')}
        content={<div class="flex justify-center items-center flex-col sm:flex-row">
            <HolismIcon icon={WarningIcon} className="text-red-400 text-5xl ltr:mr-4 rtl:ml-4" />
            <span>
                {app.t('Are you sure you want to delete this item?')}
            </span>
            {/* todo: Show some information form the selected item, to enhance UX */}
        </div>}
        actions={<OkCancel
            okText='Yes'
            cancelText='No'
            cancelClick={() => setConfirmationDialogVisibility(false)}
            okClick={deleteItem}
        />}
    />

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