import React, { useState, useContext } from 'react';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { ListContext } from '../List';
import app from '../../../Base/App';
import HolismIcon from '../../HolismIcon';

const ListAction = ({ icon, text, title, click, minCardinality }) => {

    const [progress, setProgress] = useState(false);
    const { selectedItems } = useContext(ListContext);

    const reloadList = () => {
        app.emit(app.reloadRequested)
    }

    const button = <Button
        variant="outlined"
        disabled={progress || (minCardinality && minCardinality > selectedItems.length)}
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
        onClick={() => click({ setProgress, reloadList })}
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

export { ListAction }