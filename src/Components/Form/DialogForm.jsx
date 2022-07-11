import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'Hooks'
import { ListContext } from 'Contexts'
import { DialogContext } from 'Contexts'
import { FormContext } from 'Contexts'
import Dialog from '../Dialog/Dialog'
import FormElement from './FormElement';
import Explanations from './Explanations';
import Actions from './Actions';

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
    const { setOpen, entity, parentId } = dialogContext || {}

    const [entityId, setEntityId] = useState(null)

    const {
        addFieldToFormContext,
        calculatedTitle,
        currentEntity,
        fields,
        focusFirstInput,
        formMode,
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
        parentId,
        title,
    })

    useEffect(() => {
        setCurrentEntity(entity)
    }, [entity])

    return <FormContext.Provider
        value={{
            addFieldToFormContext,
            currentEntity,
            formMode,
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
                    inputs={inputs instanceof Function ? inputs() : inputs}
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

export default DialogForm