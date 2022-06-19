import React, { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import CheckIcon from '@mui/icons-material/Check';
import Collapse from '@mui/material/Collapse';
import Filtering from "../List/Filtering";
import Sorting from "../List/Sorting";
import Entities from "../List/Entities";
import { app, EntityAction, ListContext, useLocalStorageState } from '@List';
import useList from '../../Hooks/useList';

const listActionIconStyle = "text-gray-700 hover:text-blue-500 cursor-pointer";

const Browse = ({
    callerId,
    card,
    entityType,
    filters,
    headers,
    isTree,
    row,
    sorts,
}) => {

    const [isFilteringOpen, setIsFilteringOpen] = useLocalStorageState(false, `${app.userGuid()}_${entityType}_isFilteringOpen`);

    const {
        data,
        hasData,
        listParameters,
        loading,
        metadata,
        reload,
    } = useList({
        entityType,
        isTree
    })

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
        data,
        hasData,
        listParameters,
        loading,
        metadata,
        reload,
    }} id='browser'>
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
            </div>
        </div>

        <Collapse in={isFilteringOpen}>
            <div className='mb-4'>
                <Filtering filters={filters} />
            </div>
        </Collapse>

        <Entities
            entityActions={entityActions}
        />
    </ListContext.Provider>
}

export { Browse };
export { Text } from '../List/Filters/Text';
export { Enum } from '../List/Filters/Enum';
export { Ascending } from '../List/Sorts/Ascending';