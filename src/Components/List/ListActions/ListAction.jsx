import React, { useState, useContext } from 'react';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { ListContext } from 'Contexts'
import app from 'App'
import HolismIcon from '../../HolismIcon';
import { useMessage } from 'Hooks'

const ListAction = ({ icon, text, title, click, minCardinality }) => {

    const [progress, setProgress] = useState(false);
    const {
        selectedEntities,
        reload
    } = useContext(ListContext);
    const { success, error } = useMessage()

    const button = <Button
        variant="outlined"
        disabled={progress || (minCardinality && minCardinality > selectedEntities.length)}
        startIcon={
            progress
                ?
                <CircularProgress
                    size={20}
                />
                :
                <HolismIcon icon={icon} />
            // <CircularProgress
            //     variant="determinate"
            //     value={100}
            //     size={20}
            // />

        }
        /* HolismIcon creates 321 error in production build */
        onClick={() => click({
            error,
            reloadList: reload,
            setProgress,
            success,
        })}
        className='mr-2 mt-2 lg:mt-0'
    >
        {app.t(text || title)}
    </Button>

    return <span className="listAction">
        {
            title
                ?
                <Tooltip title={app.t(title || "")}>
                    <span>
                        {button}
                    </span>
                </Tooltip>
                :
                button
        }
    </span>
};

export default ListAction 