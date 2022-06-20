import React, { useState, useEffect, useContext } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import CloseIcon from '@mui/icons-material/Close';
import { ListContext } from './Contexts';
import app from '../../Base/App';
import Holism from '../../Base/Holism';

const Sorting = ({ sorts }) => {

    if (!sorts || !Array.isArray(sorts) || sorts.length === 0) {
        return null
    }

    for (let i = 0; i < sorts.length; i++) {
        const { caption, column, direction, key } = sorts[i];
        Holism.ensure(caption);
        if (key) {
            Holism.ensure(key);
        }
        else {
            Holism.ensure([column, direction]);
        }
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const [currentSort, setCurrentSort] = useState({});
    const {
        setSorts,
        listActionIconStyle
    } = useContext(ListContext);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (sort) => {
        if (sort) {
            if (sort.caption) {
                setCurrentSort(sort);
            }
        }
        setAnchorEl(null);
    };

    const resetSort = () => {
        setCurrentSort({});
    }

    useEffect(() => {
        setSorts([currentSort]);
        // app.emit(app.reloadRequested);
    }, [currentSort]);

    return sorts && <>
        <div
            id='sorting'
            className={'flex items-center cursor-pointer ' + listActionIconStyle}
        >
            <div id='currentSort' className="uppercase text-xs text-gray-500 font-light tracking-wider flex items-center">
                {currentSort.caption
                    ?
                    <span onClick={resetSort}><CloseIcon /></span>
                    :
                    null
                }
                {app.t(currentSort.caption)}
            </div>
            <div className="flex items-center" onClick={handleClick} aria-controls='sortsMenu'>
                <ImportExportIcon />
            </div>
        </div>
        <Menu
            id="sortsMenu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: app.isRtl() ? 'left' : 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: app.isRtl() ? 'left' : 'right',
            }}
        >
            {
                sorts.map((sort, index) => <MenuItem
                    key={index}
                    onClick={(event) => {
                        handleClose(sort);
                        event.preventDefault();
                    }}
                >
                    {app.t(sort.caption)}
                </MenuItem>)
            }
        </Menu>
    </>
};

export default Sorting;