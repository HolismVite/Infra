import React, { useEffect, useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import app from '../../../Base/App';
import { get } from '../../../Base/Api';
import Filter from './Filter';
import useLocalStorageState from '../../../Base/UseLocalStorageState';
import filterOperator from '../../../Base/FilterOperator';

const Enum = ({ column, entityType, placeholder }) => {

    app.ensure([column, placeholder, entityType]);

    const [loading, setLoading] = useState();
    const [enumItems, setEnumItems] = useLocalStorageState([], entityType + 'Enum');

    useEffect(() => {
        if (enumItems.length !== 0) {
            return;
        }
        setLoading(true);
        get(`/${entityType}/all`).then(data => {
            setEnumItems(data);
            setLoading(false);
        }, error => {
            console.log(error);
            setLoading(false);
        })
    }, [enumItems.length, setEnumItems, entityType]);

    return <Filter
        type='select'
        column={column}
        placeholder={placeholder}
        operator={filterOperator.equals}
        renderInput={(value, setValue, label) =>
            <Select
                size='small'
                value={value}
                label={app.t(label)}
                fullWidth
                onChange={(event) => { setValue(event.target.value) }}
            >
                {
                    loading
                        ?
                        <CircularProgress />
                        :
                        (
                            enumItems
                                ?
                                enumItems.map(item => <MenuItem key={item.id} value={item.id}>{item.titleizedKey}</MenuItem>)
                                :
                                null
                        )
                }
            </Select>}
    />
};

export { Enum }