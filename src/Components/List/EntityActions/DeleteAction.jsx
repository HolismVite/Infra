import React, { useState, useContext } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import WarningIcon from '@mui/icons-material/Warning'
import CircularProgress from '@mui/material/CircularProgress'
import { EntityAction, EntityContext, app, post } from '@List'
import HolismIcon from '../../HolismIcon'
import Dialog from '../../../Components/Dialog/Dialog'
import { OkCancel } from '../../../Components/Dialog/OkCancel'
import { ListContext } from '../Contexts'
import useMessage from '../../../Hooks/useMessage'
import DialogContext from '../../Dialog/DialogContext'

const DeleteAction = () => {

    const [open, setOpen] = useState(false)
    const [progress, setProgress] = useState(false)

    const { entityType, reload, menuForActions } = useContext(ListContext)
    const { entity } = useContext(EntityContext)
    const { success, error } = useMessage()

    const deleteItem = () => {
        setOpen(false)
        setProgress(true)
        post(`${entityType}/delete/${entity.id}`).then(data => {
            success(app.t("Deleted successfully"))
            setProgress(false)
            reload()
        }, e => {
            error(e)
            setProgress(false)
        })
    }

    const confirmationDialog = <DialogContext.Provider
        value={{
            open,
            setOpen
        }}
    >
        <Dialog
            tiny
            title={app.t('Confirmation')}
            content={<div className="flex justify-center items-center flex-col sm:flex-row">
                <HolismIcon icon={WarningIcon} className="text-red-400 text-5xl ltr:mr-4 rtl:ml-4" />
                <span>
                    {app.t('Are you sure you want to delete this item?')}
                </span>
                {/* todo: Show some information form the selected item, to enhance UX */}
            </div>}
            actions={<OkCancel
                okText='Yes'
                cancelText='No'
                cancelClick={() => setOpen(false)}
                okClick={deleteItem}
            />}
        />
    </DialogContext.Provider>

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
                    asMenuItem={menuForActions}
                    click={(e) => {
                        setOpen(true)
                    }}
                />
        }
    </>
}

export default DeleteAction