import React, { useState, useEffect, useContext } from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import { app, FormContext, fieldStyles } from '@Form';

const Field = ({
    column,
    placeholder,
    required,
    value,
    hint,
    type,
    validate,
    renderInput
}) => {

    const [id, setId] = useState();
    const [displayValue, setDisplayValue] = useState(value || (type === 'check' ? false : ""));
    const [chosenValue, setChosenValue] = useState(value || (type === 'check' ? false : ""));
    const [chosenEntity, setChosenEntity] = useState(null);
    const [helpText, setHelpText] = useState(hint);
    const initialHint = hint;
    var formContext = useContext(FormContext);
    const { progress, currentEntity, addFieldToFormContext, setField } = formContext;
    const [validationState, setValidationState] = useState(null);
    const label = placeholder || column;

    useEffect(() => {
        setId(`${type}_${column}`);
    }, [type, column]);

    useEffect(() => {
        addFieldToFormContext(formContext, id, undefined, false);
    }, [formContext, id]);

    const validateAll = () => {
        if (required && app.isNothing(displayValue) && app.isNothing(chosenValue)) {
            setValidationState('invalid required ' + Date.now());
            setHelpText(required);
        }
        else {
            if (validate && typeof validate === 'function') {
                var result = validate({ displayValue, chosenValue, chosenEntity });
                if (!result || result === true) {
                    setValidationState('valid ' + Date.now());
                    setHelpText(initialHint);
                }
                else {
                    setValidationState(`invalid ${result?.error} ${Date.now()}`)
                    setHelpText(result?.message);
                }
            }
            else {
                setValidationState('valid ' + Date.now());
                setHelpText(initialHint);
            }
        }
    }

    useEffect(() => {
        validateAll();
    }, [displayValue]);

    useEffect(() => {
        if (currentEntity) {
            setDisplayValue(currentEntity[app.camelize(column)])
            setChosenValue(currentEntity[app.camelize(column)])
        }
    }, [column, currentEntity])

    const isValid = () => {
        if (!validationState) {
            return false;
        }
        if (validationState.indexOf('invalid') > -1) {
            return false;
        }
        return true;
    }

    useEffect(() => {
        setField(formContext, id, chosenValue, isValid() ? true : false);
    }, [validationState]);

    return <div className={fieldStyles}>
        <FormControl
            error={isValid() ? false : true}
            fullWidth
            required={required ? true : false}
            disabled={progress}
        >
            {
                type !== 'check' && <InputLabel
                    htmlFor={id}
                    disableAnimation={progress}
                    disabled={progress}
                >
                    {app.t(label)}
                </InputLabel>
            }
            {
                renderInput({
                    displayValue,
                    setDisplayValue,
                    setChosenValue,
                    setChosenEntity,
                    label,
                    id,
                    setField,
                    progress
                })
            }
            <FormHelperText
                disabled={progress}
            >
                {app.t(helpText)}
            </FormHelperText>
        </FormControl>
    </div>
};

export { Field };