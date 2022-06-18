import React, { useState, useEffect, useContext } from 'react';
import Dialog from '../Dialog/Dialog'
import { ListContext } from '../List/Contexts'
import {
    Form,
    Explanations,
    FormElement,
    Actions,
    app,
} from '@Form';

const DialogForm = ({
    entityType,
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

    useEffect(() => {
        if (dialogProps.purpose === 'edition' && dialogProps.entityType === entityType) {
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

    return <Form
        entityType={entityType}
        title={title}
        explanations={explanations}
        inputs={inputs}
        actions={actions}
        okAction={okAction}
        renderForm={({
            calculatedTitle,
            focusFirstInput,
            handleSubmit,
        }) => {
            return <Dialog
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
        }}
    />
}

export { DialogForm };