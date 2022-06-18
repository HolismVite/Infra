import React, { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import CachedIcon from '@mui/icons-material/Cached';
import CheckIcon from '@mui/icons-material/Check';
import Collapse from '@mui/material/Collapse';
import Filtering from "../List/Filtering";
import Sorting from "../List/Sorting";
import Entities from "../List/Entities";
import { app, EntityAction, ListContext, useLocalStorageState } from '@List';
import useListParameters from '../../Hooks/useListParameters';

const listActionIconStyle = "text-gray-700 hover:text-blue-500 cursor-pointer";

const Browse = ({
    sorts,
    filters,
    row,
    card,
    entityType,
    headers,
    callerId
}) => {

    const listParameters = useListParameters(app.userGuid(), entityType)
    const [isFilteringOpen, setIsFilteringOpen] = useLocalStorageState(false, `${app.userGuid()}_${entityType}_isFilteringOpen`);

    const toggleFiltering = () => {
        setIsFilteringOpen(!isFilteringOpen);
    }

    const entityActions = <>
        <EntityAction
            icon={<CheckIcon />}
            title={'Select ' + entityType}
            click={({ item }) => {
                // app.emit(app.entitySelected, { selectedEntity: item, callerId });
            }}
        />
    </>

    return <ListContext.Provider value={{
        listParameters: listParameters,
    }} id='list'>
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
                            id='showHideFiltering'
                            className={listActionIconStyle + " mr-4"}
                            onClick={toggleFiltering}><FilterListIcon /></span>
                        :
                        null
                }
                {
                    <span
                        id='reload'
                        onClick={() => {
                            // app.emit(app.reloadRequested)
                        }}
                        className={listActionIconStyle}
                    >
                        <CachedIcon />
                    </span>
                }
            </div>
        </div>

        <Collapse in={isFilteringOpen}>
            <div className='mb-4'>
                <Filtering filters={filters} />
            </div>
        </Collapse>

        <Entities
            entityType={entityType}
            headers={headers}
            row={row}
            card={card}
            entityActions={entityActions}
        />
    </ListContext.Provider>
}

export { Browse };
export { Text } from '../List/Filters/Text';
export { Enum } from '../List/Filters/Enum';
export { Ascending } from '../List/Sorts/Ascending';