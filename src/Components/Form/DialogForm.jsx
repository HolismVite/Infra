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
import DialogContext from '../Dialog/DialogContext';

const DialogForm = ({
    actions,
    entityType,
    explanations,
    humanReadableEntityType,
    inputs,
    large,
    title,
    close,
    okAction,
    ...rest
}) => {

    const {
        dialogProps,
        reload,
    } = useContext(ListContext)

    const dialogContext = useContext(DialogContext)
    const { setOpen } = dialogContext || {}

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
            setOpen(false)
            reload()
        },
        okAction,
        title
    })

    useEffect(() => {
        if (!dialogProps || dialogProps?.purpose === 'creation') {
            setCurrentEntity(null)
            setFields([])
        }
        else if (dialogProps?.purpose === 'edition' && dialogProps?.entityType === entityType) {
            setCurrentEntity(null)
            setFields([])
            if (dialogProps.entity) {
                setCurrentEntity(dialogProps.entity)
            }
            if (dialogProps.entityId) {
                setEntityId(dialogProps.entityId)
            }
        }
        return () => {
            setField([])
            setCurrentEntity(null)
            setEntityId(null)
        }
    }, [dialogProps])

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
                onCanceled={() => setOpen(false)}
            />}
            onEntered={() => {
                focusFirstInput('dialogForm')
            }}
            large={large}
            onClosed={() => setOpen(false)}
            {...rest}
        />
    </FormContext.Provider>
}

export { DialogForm };