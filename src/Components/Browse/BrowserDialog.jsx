import React, { useState, useEffect, useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import CheckIcon from '@mui/icons-material/Check';
import app from 'App'
import { useLocalStorageState } from 'Hooks'
import { useList } from 'Hooks'
import { DialogContext } from 'Contexts'
import { ListContext } from 'Contexts'
import { BrowseContext } from 'Contexts'
import Unify from '../Unify';
import Pagination from '../List/Pagination';
import Filtering from "../List/Filtering";
import Sorting from "../List/Sorting";
import Entities from "../List/Entities";
import EntityAction from '../List/EntityActions/EntityAction';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BrowserDialog = () => {
    const {
        open,
        setOpen,
    } = useContext(DialogContext)

    const {
        card,
        close,
        entityType,
        filters,
        headers,
        isTree,
        onSelected,
        row,
        selectedEntity,
        setSelectedEntity,
        sorts,
    } = useContext(BrowseContext)

    const [isFilteringOpen, setIsFilteringOpen] = useLocalStorageState(false, `${app.camelize(entityType)}_isFilteringOpen`);

    const toggleFiltering = () => {
        setIsFilteringOpen(!isFilteringOpen);
    }


    const {
        data,
        deselectEntities,
        deselectEntity,
        hasData,
        loading,
        metadata,
        reload,
        reloadEntity,
        resetFilters,
        selectedEntities,
        selectEntities,
        selectEntity,
        setEntity,
        setEntityProgress,
        setFilter,
        setPageNumber,
        setPageSize,
        setSorts,
        usedFilters,
    } = useList({
        entityType,
        isBrowse: true,
        isTree,
    })

    const entityActions = <>
        <EntityAction
            icon={<CheckIcon />}
            title='Select'
            click={({ entity }) => {
                setSelectedEntity(entity)
                if (onSelected instanceof Function) {
                    onSelected(entity)
                }
                if (close instanceof Function) {
                    close()
                }
            }}
        />
    </>

    const list = <>
        <div className='flex items-center justify-end px-6 py-2'>
            <div className="flex items-center">
                {
                    sorts
                        ?
                        <Sorting sorts={sorts} />
                        :
                        null
                }
                {
                    filters && (filters.props?.children?.length > 0 || filters.props?.children?.props)
                        ?
                        <span
                            className={listActionIconStyle + " mr-4"}
                            onClick={toggleFiltering}><FilterListIcon /></span>
                        :
                        null
                }
            </div>
        </div>

        <Collapse in={isFilteringOpen}>
            <div className='mb-4'>
                <Filtering filters={filters} />
            </div>
        </Collapse>

        <Entities />
    </>

    return <ListContext.Provider value={{
        card,
        data,
        deselectEntities,
        deselectEntity,
        entityActions,
        hasData,
        headers,
        isBrowse: true,
        loading,
        metadata,
        reload,
        reloadEntity,
        resetFilters,
        row,
        selectedEntities,
        selectEntities,
        selectEntity,
        setEntity,
        setEntityProgress,
        setFilter,
        setPageNumber,
        setPageSize,
        setSorts,
        usedFilters,
    }}>
        <Dialog
            open={open}
            fullScreen
            TransitionComponent={Transition}
            onClose={() => setOpen(false)}
        >
            <DialogTitle
                className="bg-gray-100"
            >
                <div className="flex items-center justify-between">
                    <div
                        className="flex gap-4 items-center"
                    >
                        <IconButton
                            onClick={() => setOpen(false)}
                        >
                            <CloseIcon />
                        </IconButton>
                        <span className="ml-4">{app.t("Find")}</span>
                    </div>
                    <div
                        dir='ltr'
                        className="listActions flex-1 flex gap-4"
                    >
                        <IconButton
                            onClick={() => setIsFilteringOpen(!isFilteringOpen)}
                        >
                            <FilterListIcon />
                        </IconButton>
                        {/* <IconButton
                    onClick={() => setOpen(false)}
                >
                    <CloseIcon />
                </IconButton>
                <IconButton
                    onClick={() => setOpen(false)}
                >
                    <CachedIcon />
                </IconButton> */}
                    </div>
                </div>
            </DialogTitle>
            <DialogContent
                className="px-0"
            >
                <div
                    className="flex "
                >
                    <Collapse in={isFilteringOpen} orientation='horizontal'>
                        <div
                            className="w-72 p-5"
                        >filters</div>
                    </Collapse>
                    <div
                        className="flex-1 px-5"
                    >
                        {list}
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Pagination />
            </DialogActions>
        </Dialog>
    </ListContext.Provider>
}

export default BrowserDialog