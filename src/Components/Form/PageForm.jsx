import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { useForm } from '../../Hooks/useForm'
import { FormContext } from './Contexts';
import {
    Actions,
    app,
    Explanations,
    FormElement,
    Page,
} from '@Form';

const PageForm = ({
    actions,
    entityType,
    explanations,
    humanReadableEntityType,
    inputs,
    large,
    loader,
    returnTo,
    title,
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
        addFieldToFormContext,
        calculatedTitle,
        currentEntity,
        handleSubmit,
        isValid,
        mode,
        progress,
        setField,
        setHasFile,
    } = useForm({
        entityId: entityId || id,
        entityType,
        humanReadableEntityType,
        loader,
        onSaved: navigateBack,
        title,
    })

    return <Page
        title={calculatedTitle}
        className={"px-6 md:px-12 mx-auto dark:bg-zinc-700 " + (large ? "lg:w-full" : "lg:w-2/3")}
    >
        <FormContext.Provider value={{
            addFieldToFormContext,
            currentEntity,
            isValid,
            mode,
            progress,
            setField,
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

export default PageForm 