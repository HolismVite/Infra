import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { app, post, HolismIcon } from '@List';

const BooleanProperty = ({
    column,
    title,
    value,
    actionUrl
}) => {

    const [progress, setProgress] = useState(false);

    const onChange = (e) => {
        console.log(e);
        if (!actionUrl || app.isNothing(actionUrl)) {
            return;
        }
        setProgress(true);
        var api = actionUrl;
        if (typeof actionUrl === 'function') {
            api = actionUrl(e.target.checked);
        }
        post(api).then(data => {
            setProgress(false);
            app.success('Applied');
            app.emit(app.entityRerenderRequested, data);
        }, error => {
            app.error(error);
            setProgress(false);
        });
    }

    const control = actionUrl
        ?
        <Switch
            checked={value || false}
            onChange={(e) => onChange(e)}
            inputProps={{ 'aria-label': title }}
            size='small'
        />
        :
        <div className={"" + (value === true ? " text-green-600 " : " text-red-600 ")}>
            {
                value === true
                    ?
                    <HolismIcon icon={CheckIcon} />
                    :
                    <HolismIcon icon={ClearIcon} />
            }
        </div>
    return <div className="property boolean flex items-center justify-center">
        {
            progress
                ?
                <CircularProgress
                    size={16}
                    className="my-1"
                />
                :
                title
                    ?
                    <Tooltip title={title || ""}>
                        {
                            control
                        }
                    </Tooltip>
                    :
                    control
        }
    </div>
}

export { BooleanProperty }