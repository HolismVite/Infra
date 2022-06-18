import React, { useState, useEffect, useContext } from 'react';
import { app, get, post, upload, useMessage } from '@Form';
import { FormContext } from './Contexts';
import { ListContext } from '../List/Contexts'

const Form = ({
  entityType,
  entity,
  humanReadableEntityType,
  title,
  explanations,
  inputs,
  actions,
  large,
  renderForm,
  okAction,
}) => {
  // is edit, or is create? get id from somewhere
  // file upload
  // if is edit, load entity (only if they don't provide their own get method)
  // save
  const formMode = {
    creation: 1,
    edition: 2
  }
  const [fields, setFields] = useState([]);
  const [progress, setProgress] = useState();
  const [isValid, setIsValid] = useState(false);
  const [currentEntity, setCurrentEntity] = useState(entity);
  const [mode, setMode] = useState(formMode.creation)
  const [calculatedTitle, setCalculatedTitle] = useState('')
  const [hasFile, setHasFile] = useState(false)
  const [extraParams, setExtraParams] = useState()
  const { success, error } = useMessage()

  const {
    isDialogOpen,
    setIsDialogOpen,
    dialogProps
  } = useContext(ListContext)

  app.ensure([entityType]);

  const addFieldToFormContext = (formContext, id, value, isValid) => {
    if (!formContext) {
      return
    }
    if (!id) {
      return
    }
    for (var i = 0; i < fields.length; i++) {
      if (fields[i].id === id) {
        return
      }
    }
    setFields((previousFields) => {
      return [{
        id: id,
        value: value,
        isValid: isValid
      }, ...previousFields]
    })
  }

  const setField = (formContext, id, value, isValid) => {
    if (!formContext) {
      return;
    }
    const { setFields } = formContext
    setFields((previousFields) => {
      for (var i = 0; i < previousFields.length; i++) {
        if (previousFields[i].id === id) {
          previousFields[i].value = value;
          previousFields[i].isValid = isValid;
        }
      }
      return [...previousFields]
    })
  };

  useEffect(() => {
    // app.updateToken();
  }, [])

  const validate = () => {
    for (let i = 0; i < fields.length; i++) {
      if (!fields[i].isValid) {
        setIsValid(false);
        return;
      }
    }
    setIsValid(true);
  }

  const focusFirstInput = (formId) => {
    var firstField = document.querySelector(`#${formId} .field:first-child input`);
    if (!firstField) {
      firstField = document.querySelector(`#${formId} .field:first-child textarea`);
    }
    if (firstField && firstField.focus) {
      firstField.focus();
    }
  };

  useEffect(() => {
    if (currentEntity && currentEntity.id) {
      setMode(formMode.edition)
      // setFields(currentEntity)
    }
    else {
      setMode(formMode.creation)
    }
  }, [currentEntity])

  useEffect(() => {
    if (typeof title === 'string') {
      setCalculatedTitle(title)
    }
    else if (typeof title === 'function') {
      setCalculatedTitle(title(mode))
    }
    else {
      setCalculatedTitle(`${mode === formMode.edition ? 'Edit' : 'Create'} ${humanReadableEntityType || entityType}`)
    }
  }, [mode])

  useEffect(() => {
    if (dialogProps.purpose === 'edition' && dialogProps.entityType === entityType) {
      if (dialogProps.entity) {
        setCurrentEntity(dialogProps.entity);
      }
      if (dialogProps.entityId) {
        setProgress(true)
        get(`/${entityType}/get/${params.entityId}`)
          .then(data => {
            setProgress(false)
            setCurrentEntity(data)
          }, error => {
            setProgress(false)
            app.error(error)
          })
      }
      setIsDialogOpen(true)
    }
  }, [isDialogOpen])

  useEffect(() => {
    validate()
    window.fields = fields;
    app.updateToken()
  }, [validate, fields]);

  const handleSubmit = (event) => {
    // app.emit(app.formSubmitted);
    if (!isValid) {
      event.preventDefault();
      return;
    }
    var data = hasFile ? new FormData() : {};
    if (hasFile) {
      app.selectedFiles.forEach(file => {
        data.append('file', file);
      });
    }
    new URLSearchParams(window.location.search).forEach((value, key) => data[key] = value);
    for (let i = 0; i < fields.length; i++) {
      const key = fields[i].id.split('_')[1];
      const value = fields[i].value;
      if (hasFile) {
        data.append(key, value);
      }
      else {
        data[key] = fields[i].value;
      }
    }
    if (extraParams && typeof extraParams === 'object') {
      data = { ...data, ...extraParams };
    }
    console.log(data);
    if (okAction && typeof okAction === 'function') {
      okAction({ setProgress, data, currentEntity });
    }
    else {
      setProgress(true);
      // setTimeout(() => {
      //   setProgress(false)
      // }, 4000)
      let url = `${entityType}/`;
      if (hasFile) {
        url += 'upload'
      } else {
        url += `${mode === formMode.creation ? 'create' : 'update'}`
      }
      if (window.location.search) {
        const query = window.location.search.slice(1);
        if (url.indexOf('?') > -1) {
          url += '&';
        }
        else {
          url += '?'
        }
        url += query
      }
      if (mode === formMode.edition) {
        data['id'] = currentEntity.id;
      }
      const method = hasFile ? upload : post
      method(url, data).then(data => {
        success(app.t(`Item ${(mode === formMode.creation ? 'created' : 'updated')} successfully`))
        setProgress(false);
      }, e => {
        error(e);
        setProgress(false);
      })
    }
    event.preventDefault();
  }
  return <FormContext.Provider value={{
    fields,
    setFields,
    addFieldToFormContext,
    setField,
    isValid,
    progress,
    currentEntity,
    mode,
    setHasFile
  }}>
    {
      renderForm({
        calculatedTitle: app.t(calculatedTitle || title),
        focusFirstInput,
        handleSubmit
      })
    }
  </FormContext.Provider >
}

export { Form };