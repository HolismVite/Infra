import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { ListContext } from '../List/Contexts';
import {
    Form,
    Page,
    Explanations,
    FormElement,
    Actions,
    app
} from '@Form';

const PageForm = ({
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
    const { setIsDialogOpen, setDialogProps } = useContext(ListContext)

    useEffect(() => {
        setDialogProps({
            entityType,
            entityId: entityId || id
        })
        setIsDialogOpen(true)
    }, [])

    useEffect(() => {
        const onCancelOrOk = (item) => {
            navigate(-1)
        }
        // app.on(app.formCanceled, onCancelOrOk)
    }, [])

    return <Form
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

export { PageForm }