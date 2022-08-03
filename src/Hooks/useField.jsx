import { useState, useEffect, useContext } from 'react'
import { FormContext } from 'Contexts'

const useField = ({
    column,
    hint,
    placeholder,
    required,
    type,
    validate,
    value,
}) => {

    const [id, setId] = useState()
    const [displayValue, setDisplayValue] = useState(value || (type === 'check' ? false : ""))
    const [chosenValue, setChosenValue] = useState(value || (type === 'check' ? false : ""))
    const [chosenEntity, setChosenEntity] = useState(null)
    const [helpText, setHelpText] = useState(hint)
    const initialHint = hint
    const {
        progress,
        currentEntity,
        addFieldToFormContext,
        setField
    } = useContext(FormContext)
    const [validationState, setValidationState] = useState(null)
    const label = placeholder || column
    const [camelizedColumn, setCamelizedColumn] = useState(column)

    useEffect(() => {
        setId(`${type}_${column}`)
        if (isNaN(column)) {
            setCamelizedColumn(app.camelize(column))
        } else {
            setCamelizedColumn(column)
        }
    }, [type, column])

    useEffect(() => {
        addFieldToFormContext(id, undefined, false)
    }, [id])

    const validateAll = () => {
        if (required && app.isNothing(displayValue) && app.isNothing(chosenValue)) {
            setValidationState('invalid required ' + Date.now())
            setHelpText(required)
        }
        else {
            if (validate && typeof validate === 'function') {
                var result = validate({ displayValue, chosenValue, chosenEntity })
                if (!result || result === true) {
                    setValidationState('valid ' + Date.now())
                    setHelpText(initialHint)
                }
                else {
                    setValidationState(`invalid ${result?.error} ${Date.now()}`)
                    setHelpText(result?.message)
                }
            }
            else {
                setValidationState('valid ' + Date.now())
                setHelpText(initialHint)
            }
        }
    }

    useEffect(() => {
        validateAll()
    }, [displayValue])

    useEffect(() => {
        if (currentEntity) {
            setDisplayValue(currentEntity[camelizedColumn])
            setChosenValue(currentEntity[camelizedColumn])
        }
    }, [camelizedColumn, currentEntity])

    const isValid = () => {
        if (!validationState) {
            return false
        }
        if (validationState.indexOf('invalid') > -1) {
            return false
        }
        return true
    }

    useEffect(() => {
        setField(id, chosenValue, isValid() ? true : false)
    }, [validationState])

    return {
        displayValue: displayValue || '',
        helpText,
        id,
        isValid,
        label,
        progress,
        setChosenEntity,
        setChosenValue,
        setDisplayValue,
        setField,
        validateAll,
    }
}

export default useField