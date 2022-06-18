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
    title,
    explanations,
    inputs,
    actions,
    large,
    returnTo
}) => {

    const navigate = useNavigate();
    const { id, entityId } = app.parseQuery()

    const navigateBack = () => {
        if (returnTo) {
            navigate(returnTo)
        }
        else {
            navigate(-1)
        }
    }

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
        title,
        entityId: entityId || id,
        onSaved: navigateBack
    })

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
                onCanceled={navigateBack}
            />
        </FormContext.Provider>
    </Page >
}

export { PageForm }