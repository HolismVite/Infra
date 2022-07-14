import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import app from 'App'
import { useMessage } from 'Hooks'
import { useForm } from 'Hooks'
import { FormContext } from 'Contexts'
import Actions from './Actions'
import Explanations from './Explanations'
import FormElement from './FormElement'
import Page from '../Page/Page'

const PageForm = ({
    actions,
    entityType,
    explanations,
    humanReadableEntityType,
    inputs,
    large,
    loader,
    onLoad,
    progress: externalProgress,
    returnTo,
    title,
}) => {

    const [contentProgress, setContentProgress] = useState()
    
    const { error } = useMessage()

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
        externalProgress,
        humanReadableEntityType,
        loader,
        onSaved: navigateBack,
        title,
    })

    useEffect(() => {
        if (onLoad instanceof Function) {
            onLoad({ setProgress: setContentProgress, error })
        }
    }, [])

    return <Page
        title={calculatedTitle}
        className={"px-6 md:px-12 mx-auto dark:bg-zinc-700 " + (large ? "lg:w-full" : "lg:w-2/3")}
    >
        <FormContext.Provider value={{
            addFieldToFormContext,
            contentProgress,
            currentEntity,
            externalProgress,
            isValid,
            mode,
            progress,
            setField,
            setHasFile
        }}>
            <Explanations explanations={explanations} />
            <Actions
                actions={actions}
                handleSubmit={handleSubmit}
                onCanceled={navigateBack}
            />
            <div className="mb-10"></div>
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