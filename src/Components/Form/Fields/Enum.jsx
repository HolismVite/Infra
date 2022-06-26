import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import app from 'App'
import { get } from '../../../Base/Api';
import useLocalStorageState from '../../../Base/UseLocalStorageState'
import fieldStyles from './FieldStyle'
import Select from './Select'

const Enum = ({
    entityType,
    ...rest
}) => {

    app.ensure([entityType]);

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
    }, [entityType]);

    return <div className={fieldStyles}>
        {
            loading
                ?
                <CircularProgress />
                :
                <Select
                    {...rest}
                    options={enumItems}
                    display={item => item.key}
                    choose={item => item.id}
                />
        }
    </div>
};

export default Enum ;
