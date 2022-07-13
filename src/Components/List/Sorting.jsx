import React, { useState, useEffect, useContext } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import CloseIcon from '@mui/icons-material/Close';
import { ListContext } from 'Contexts'
import app from 'App'

const Sorting = ({ sorts }) => {

    if (!sorts || !Array.isArray(sorts) || sorts.length === 0) {
        return null
    }

    for (let i = 0; i < sorts.length; i++) {
        const { caption, column, direction, key } = sorts[i];
        app.ensure(caption);
        if (key) {
            app.ensure(key);
        }
        else {
            app.ensure([column, direction]);
        }
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const [currentSort, setCurrentSort] = useState({});
    const {
        isBrowse,
        listActionIconStyle,
        setSorts,
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
                    <span onClick={resetSort}>
                        <Tooltip title={app.t('Remove sort')}>
                            <CloseIcon fontSize='small' />
                        </Tooltip>
                    </span>
                    :
                    null
                }
                {app.t(currentSort.caption)}
            </div>
            <div
                className="flex items-center"
                onClick={handleClick}
            >
                {
                    isBrowse
                        ?
                        <Tooltip title={app.t('Sorts')}>
                            <IconButton>
                                <ImportExportIcon />
                            </IconButton>
                        </Tooltip>
                        :
                        <Tooltip title={app.t('Sorts')}>
                            <ImportExportIcon />
                        </Tooltip>
                }
            </div>
        </div>
        <Menu
            id="sortsMenu"
            anchorEl={anchorEl}
            keepMounted
            PaperProps={{
                className: "dark:bg-zinc-700"
            }}
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