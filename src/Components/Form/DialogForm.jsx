import React, { useState, useEffect, useContext } from 'react';
import Dialog from '../Dialog/Dialog'
import { ListContext } from '../List/Contexts'
import {
    FormBase,
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

    const { isDialogFormOpen, setIsDialogFormOpen } = useContext(ListContext)

    useEffect(() => {
        const onEditRequested = (params) => {
            if (params.entityType === entityType) {
                setIsDialogFormOpen(true)
            }
        }
        app.on(app.editRequested, onEditRequested)
        return () => {
            app.removeListener(app.editRequested, onEditRequested)
        }
    }, [entityType])

    useEffect(() => {
        const onEntityActionDialogRequested = ({ entity, purpose }) => {
            if (entity?.id === entityId && dialogPurpose === purpose) {
                setIsDialogFormOpen(true);
            }
        }
        app.on(app.entityActionDialogRequested, onEntityActionDialogRequested)
        return () => app.removeListener(app.entityActionDialogRequested, onEntityActionDialogRequested)
    }, [entityId, dialogPurpose])

    useEffect(() => {
        const onFormCanceled = (item) => {
            setIsDialogFormOpen(false);
            if (close && typeof close === 'function') {
                close()
            }
        }
        app.on(app.formCanceled, onFormCanceled)
        return () => app.removeListener(app.formCanceled, onFormCanceled)
    }, [])

    useEffect(() => {
        const onItemUpserted = (item) => {
            setIsDialogFormOpen(false);
        }
        app.on(app.itemUpserted, onItemUpserted)
        return () => app.removeListener(app.itemUpserted, onItemUpserted)
    }, [])

    return <FormBase
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
                isOpen={isOpen || isDialogFormOpen}
                onEntered={() => {
                    focusFirstInput('dialogForm')
                }}
                large={large}
                onClosed={() => {
                    setIsDialogFormOpen(false)
                    if (close && typeof close === 'function') {
                        close()
                    }
                }}
            />
        }}
    />
}

export { DialogForm };