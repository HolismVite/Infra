import React, { useContext } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import CheckIcon from '@mui/icons-material/Check';
import Collapse from '@mui/material/Collapse';
import { useLocalStorageState } from 'Hooks'
import { useList } from 'Hooks'
import { ListContext } from 'Contexts'
import { BrowseContext } from 'Contexts'
import Unify from '../Unify';
import Filtering from "../List/Filtering";
import Sorting from "../List/Sorting";
import Entities from "../List/Entities";
import EntityAction from '../List/EntityActions/EntityAction';

const listActionIconStyle = "text-gray-700 hover:text-blue-500 cursor-pointer";

const Browse = ({
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
        loading,
        metadata,
        reload,
    } = useList({
        entityType,
        isTree
    })

    const { selectedEntity, setSelectedEntity, close } = useContext(BrowseContext)

    const toggleFiltering = () => {
        setIsFilteringOpen(!isFilteringOpen);
    }

    const entityActions = <>
        <EntityAction
            icon={<CheckIcon />}
            title={'Select ' + entityType}
            click={({ item }) => {
                setSelectedEntity(item)
                if (close instanceof Function) {
                    close()
                }
            }}
        />
    </>

    return <ListContext.Provider value={{
        card,
        data,
        entityActions,
        hasData,
        headers,
        isBrowse: true,
        loading,
        metadata,
        reload,
        row,
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

        <Entities />
    </ListContext.Provider>
}

export default Browse