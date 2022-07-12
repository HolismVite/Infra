import React, { useContext, useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import app from 'App'
import { ListContext } from 'Contexts'
import filterOperator from '../../../Base/FilterOperator';

const Filter = ({
    column,
    placeholder,
    children,
    type,
    value,
    renderInput,
    operator
}) => {

    app.ensure(column);

    const [id, setId] = useState();
    const [displayValue, setDisplayValue] = useState(value || "");
    var {
        addFilter
    } = useContext(ListContext);
    const label = placeholder || column;

    // todo: on resetting filters => setDisplayValue(value || "");

    useEffect(() => {
        setId(`${type}_${column}`)
    }, [type, column]);

    useEffect(() => {
        addFilter(column, displayValue, operator || filterOperator.contains);
    }, [column, addFilter, operator, displayValue]);

    return <div className="filter w-full">
        <FormControl
            fullWidth
        >
            <InputLabel
                size='small'
                htmlFor={id}
            >
                {app.t(label)}
            </InputLabel>
            {
                renderInput({
                    value: displayValue,
                    setValue: setDisplayValue,
                    label
                })
            }
        </FormControl>
    </div>
}

export default Filter;