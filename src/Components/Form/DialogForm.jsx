import React, { useState, useEffect, useContext } from 'react';
import Dialog from '../Dialog/Dialog'
import { ListContext } from '../List/Contexts'
import { useForm } from '../../Hooks/useForm'
import {
    Actions,
    Explanations,
    FormElement,
} from '@Form';
import { FormContext } from './Contexts';

const DialogForm = ({
    actions,
    close,
    entityType,
    explanations,
    humanReadableEntityType,
    inputs,
    isOpen,
    large,
    okAction,
    title,
}) => {

    const {
        dialogProps,
        isDialogOpen,
        setIsDialogOpen,
    } = useContext(ListContext)
    const [open, setOpen] = useState(isDialogOpen)
    const [entityId, setEntityId] = useState(null)

    const {
        addFieldToFormContext,
        calculatedTitle,
        currentEntity,
        fields,
        focusFirstInput,
        handleSubmit,
        isValid,
        loadEntity,
        mode,
        progress,
        setField,
        setFields,
        setHasFile,
    } = useForm({
        entityId,
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
                setEntityId(dialogProps.entityId)
            }
            setIsDialogOpen(true)
        }
    }, [isDialogOpen])

    return <FormContext.Provider
        value={{
            addFieldToFormContext,
            currentEntity,
            isValid,
            mode,
            progress,
            setField,
            setHasFile
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