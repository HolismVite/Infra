import React, { useState, useEffect, useContext } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import CloseIcon from '@mui/icons-material/Close';
import { ListContext } from './List';
import app from '../../Base/App';
import Holism from '../../Base/Holism';

const Sorting = ({ sorts }) => {

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
    const { listParameters } = useContext(ListContext);

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
        listParameters.sorts = [currentSort];
        app.emit(app.reloadRequested);
    }, [currentSort]);

    return <>
        <div
            id='sorting'
            className={
                'flex items-center cursor-pointer text-gray-700 hover:text-blue-500'
                + (app.isRtl() ? " ml-2 " : " mr-2 ")
            }
        >
            <div id='currentSort' className="uppercase text-xs text-gray-500 font-light tracking-wider flex items-center">
                {currentSort.caption
                    ?
                    <span onClick={resetSort}><CloseIcon /></span>
                    :
                    null
                }
                {currentSort.caption}
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
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
            {
                sorts.map((sort, index) => <MenuItem
                    key={index}
                    onClick={(event) => {
                        handleClose(sort);
                        event.preventDefault();
                    }}
                >
                    {sort.caption}
                </MenuItem>)
            }
        </Menu>
    </>
};

export default Sorting;