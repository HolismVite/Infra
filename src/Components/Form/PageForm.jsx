import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { ListContext } from '../List/Contexts';
import { useForm } from '../../Hooks/useForm'
import { FormContext } from './Contexts';
import {
    Page,
    Explanations,
    FormElement,
    Actions,
    app
} from '@Form';

const PageForm = ({
    entityType,
    humanReadableEntityType,
    entity,
    title,
    explanations,
    inputs,
    actions,
    large
}) => {

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
        humanReadableEntityType
    })

    const navigate = useNavigate();
    const { id, entityId } = app.parseQuery()

    return <Page
        title={calculatedTitle}
        className={"px-6 md:px-12 mx-auto " + (large ? "lg:w-full" : "lg:w-2/3")}
    >
        <FormContext.Provider value={{
            addFieldToFormContext,
            setField,
            isValid,
            progress,
            currentEntity,
            mode,
            setHasFile
        }}>
            <Explanations explanations={explanations} />
            <FormElement
                id='form'
                inputs={inputs}
                handleSubmit={handleSubmit}
            />
            <Actions
                actions={actions}
                handleSubmit={handleSubmit}
                onCanceled={() => navigate(-1)}
            />
        </FormContext.Provider>
    </Page >
}

export { PageForm }