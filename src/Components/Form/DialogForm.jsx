import React, { useState, useEffect, useContext } from 'react';
import Dialog from '../Dialog/Dialog'
import { ListContext } from '../List/Contexts'
import { useForm } from '../../Hooks/useForm'
import {
    Explanations,
    FormElement,
    Actions,
    app,
} from '@Form';
import { FormContext } from './Contexts';

const DialogForm = ({
    entityType,
    humanReadableEntityType,
    title,
    explanations,
    inputs,
    actions,
    large,
    okAction,
    entityId,
    dialogPurpose,
    isOpen,
    close
}) => {

    const {
        isDialogOpen,
        setIsDialogOpen,
        dialogProps
    } = useContext(ListContext)
    const [open, setOpen] = useState(isDialogOpen)

    const {
        fields,
        setFields,
        calculatedTitle,
        addFieldToFormContext,
        setField,
        isValid,
        progress,
        currentEntity,
        mode,
        setHasFile,
        handleSubmit
    } = useForm({
        entityType,
        humanReadableEntityType,
        title
    })

    useEffect(() => {
        if (dialogProps.purpose === 'edition' && dialogProps.entityType === entityType) {
            if (dialogProps.entity) {
                setCurrentEntity(dialogProps.entity);
            }
            if (dialogProps.entityId) {

            }
            setIsDialogOpen(true)
        }
    }, [isDialogOpen])

    useEffect(() => {
        const onEntityActionDialogRequested = ({ entity, purpose }) => {
            if (entity?.id === entityId && dialogPurpose === purpose) {
                setIsDialogOpen(true);
            }
        }
        // app.on(app.entityActionDialogRequested, onEntityActionDialogRequested)
    }, [entityId, dialogPurpose])

    useEffect(() => {
        const onFormCanceled = (item) => {
            setIsDialogOpen(false);
            if (close && typeof close === 'function') {
                close()
            }
        }
        // app.on(app.formCanceled, onFormCanceled)
    }, [])

    return <FormContext.Provider
        value={{

        }}>
        <Dialog
            title={calculatedTitle}
            content={<>
                <Explanations explanations={explanations} />
                <FormElement
                    id='dialogForm'
                    inputs={inputs}
                    handleSubmit={handleSubmit}
                />
            </>}
            actions={<Actions
                actions={actions}
                handleSubmit={handleSubmit}
                onCanceled={() => setIsDialogOpen(false)}
            />}
            isOpen={isOpen || isDialogOpen}
            onEntered={() => {
                focusFirstInput('dialogForm')
            }}
            large={large}
            onClosed={() => {
                setIsDialogOpen(false)
                if (close && typeof close === 'function') {
                    close()
                }
            }}
        />
    </FormContext.Provider>
}

export { DialogForm };