import React, { useContext, useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import app from '../../../Base/App';
import { ListContext } from "../List";
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
    var { listParameters } = useContext(ListContext);
    const label = placeholder || column;

    useEffect(() => {
        const reset = () => {
            setDisplayValue(value || "");
        };
        app.on(app.resetFilters, reset);
        return () => {
            app.removeListener(app.resetFilters, reset);
        }
    }, [value]);

    useEffect(() => {
        setId(`${type}_${column}`)
    }, [type, column]);

    useEffect(() => {
        listParameters.addFilter(column, operator || filterOperator.contains, displayValue);
    }, [column, listParameters, operator, displayValue]);

    return <div className="filter mt-1 mr-4 w-64">
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
                renderInput(displayValue, setDisplayValue, label)
            }
        </FormControl>
    </div>
}

export default Filter;