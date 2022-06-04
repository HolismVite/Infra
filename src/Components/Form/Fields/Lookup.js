import React, { useEffect, useState, useContext, useRef } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import CircularProgress from '@mui/material/CircularProgress';
import { FormContext, fieldStyles, get, app } from '@Form';

const Lookup = ({ column, entityType, placeholder, hint, value, required, display }) => {

    if (app.isNothing(entityType)) {
        throw new Error(`entityType is not provided for ${Lookup.name}`);
    }

    const [id, setId] = useState(null);
    const [displayValue, setDisplayValue] = useState(value);
    const [labelId, setLabelId] = useState(null);
    const htmlSelect = useRef();
    const [helpText, setHelpText] = useState(hint);
    const [loading, setLoading] = useState();
    const [lookupItems, setLookupItems] = useState([]);
    const initialHint = hint;
    const [validationResult, setValidationResult] = useState(null);
    var formContext = useContext(FormContext);
    const { addFieldToFormContext, setField } = formContext;

    useEffect(() => {
        setId(`lookup_${column}`);
    }, [column]);

    useEffect(() => {
        setLabelId(`${id}_label`);
        addFieldToFormContext(formContext, id, undefined, false);
        var handler = () => {
            validate();
        };
        app.on(app.formSubmitted, handler);
        return () => {
            app.removeListener(app.formSubmitted, handler);
        }
    }, [id, formContext])

    useEffect(() => {
        if (lookupItems.length !== 0) {
            return;
        }
        setLoading(true);
        get(`/${entityType}/all`).then(data => {
            setLookupItems(data);
            setLoading(false);
        }, error => {
            app.error(error);
            setLoading(false);
        })
    }, []);

    useEffect(() => {
        validate();
    }, [displayValue]);

    const validate = (event) => {
        console.log(displayValue);
        if (required && app.isNothing(displayValue)) {
            setValidationResult('invalid required');
            setHelpText(required);
        }
        else {
            setValidationResult(null);
            setHelpText(initialHint);
        }
    }

    useEffect(() => {
        setField(formContext, id, displayValue, validationResult ? false : true);
    }, [validationResult]);

    return <div className={fieldStyles}>
        {
            loading
                ?
                <CircularProgress />
                :
                <FormControl
                    fullWidth
                    error={validationResult ? true : false}
                >
                    <InputLabel id={labelId}>{placeholder}</InputLabel>
                    <Select
                        ref={htmlSelect}
                        error={validationResult ? true : false}
                        required={validationResult ? true : false}
                        placeholder={placeholder}
                        defaultValue={value || ""}
                        fullWidth
                        onChange={(event) => { setDisplayValue(event.target.value); }}
                        value={value}
                    >
                        {lookupItems.map(item => <MenuItem
                            key={item.id}
                            value={item.id}
                        >
                            {
                                display(item)
                            }
                        </MenuItem>)}
                    </Select>
                    <FormHelperText>{helpText}</FormHelperText>
                </FormControl>
        }
    </div>
};

export { Lookup };
