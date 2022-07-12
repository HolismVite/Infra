import React, { useContext, useState, useEffect } from 'react';
import app from 'App'
import filterOperator from 'App';
import { ListContext } from 'Contexts'

const useFilter = ({
    column,
    operator,
    placeholder,
    type,
}) => {

    app.ensure(column);

    const [id, setId] = useState();
    const [value, setValue] = useState();
    var {
        addFilter
    } = useContext(ListContext);
    const label = placeholder || column;

    // todo: on resetting filters => setValue(value || "");

    useEffect(() => {
        setId(`${type}_${column}`)
    }, [type, column]);

    useEffect(() => {
        addFilter(column, value, operator || filterOperator.contains);
    }, [column, addFilter, operator, value]);

    return {
        label,
        value,
        setValue,
    }
}

export default useFilter