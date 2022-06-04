import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Select, app, useLocalStorageState, get, fieldStyles } from '@Form';

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

export { Enum };
