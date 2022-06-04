import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import {
    FormBase,
    Page,
    Explanations,
    FormElement,
    Actions,
    app
} from '@Form';

const Form = ({
    entityType,
    entity,
    title,
    explanations,
    inputs,
    actions,
    large
}) => {

    const navigate = useNavigate();
    const { id, entityId } = app.parseQuery()

    useEffect(() => {
        if (entityId) {
            app.emit(app.editRequested, { entityType, entityId })
        }
        if (id) {
            app.emit(app.editRequested, { entityType, entityId: id })
        }
    }, [])

    useEffect(() => {
        const onCancelOrOk = (item) => {
            navigate(-1)
        }
        app.on(app.formCanceled, onCancelOrOk)
        app.on(app.itemUpserted, onCancelOrOk)
        return () => {
            app.removeListener(app.formCanceled, onCancelOrOk)
            app.removeListener(app.itemUpserted, onCancelOrOk)
        }
    }, [])

    return <FormBase
        title={title}
        entityType={entityType}
        entity={entity}
        renderForm={({
            calculatedTitle,
            focusFirstInput,
            handleSubmit,
        }) => {
            return <Page
                title={calculatedTitle}
                className={"px-6 md:px-12 mx-auto " + (large ? "lg:w-full" : "lg:w-2/3")}
            >
                <Explanations explanations={explanations} />
                <FormElement
                    id='form'
                    inputs={inputs}
                    handleSubmit={handleSubmit}
                />
                <Actions
                    actions={actions}
                    handleSubmit={handleSubmit}
                />
            </Page>
        }}
    />
}

export { Form }