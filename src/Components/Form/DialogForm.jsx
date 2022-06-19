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
    entityType,
    explanations,
    humanReadableEntityType,
    inputs,
    large,
    title,
}) => {

    const {
        closeDialog,
        dialogProps,
        isDialogOpen,
        reload,
        setIsDialogOpen,
    } = useContext(ListContext)
    const [entityId, setEntityId] = useState(null)

    const {
        addFieldToFormContext,
        calculatedTitle,
        currentEntity,
        focusFirstInput,
        handleSubmit,
        isValid,
        mode,
        progress,
        setCurrentEntity,
        setField,
        setFields,
        setHasFile,
    } = useForm({
        entityId,
        entityType,
        humanReadableEntityType,
        onSaved: () => {
            closeDialog()
            reload()
        },
        title
    })

    useEffect(() => {
        if (!dialogProps || dialogProps?.purpose === 'creation') {
            setCurrentEntity(null)
            setFields([])
        }
        else if (dialogProps?.purpose === 'edition' && dialogProps?.entityType === entityType) {
            if (dialogProps.entity) {
                setCurrentEntity(dialogProps.entity)
            }
            if (dialogProps.entityId) {
                setEntityId(dialogProps.entityId)
            }
            setIsDialogOpen(true)
        }
    }, [isDialogOpen, dialogProps])

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
                onCanceled={closeDialog}
            />}
            isOpen={isDialogOpen}
            onEntered={() => {
                focusFirstInput('dialogForm')
            }}
            large={large}
            onClosed={closeDialog}
        />
    </FormContext.Provider>
}

export { DialogForm };