import React, { useContext } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import app from 'App'
import { ListContext } from 'Contexts'
import { EntityContext } from 'Contexts'
import Pagination from './Pagination';
import EntityActions from './EntityActions/EntityActions';
import NoEntitiesFound from '../NoEntitiesFound';

const Cards = () => {

    const {
        card,
        classProvider,
        create,
        data,
        deselectEntities,
        deselectEntity,
        edit,
        entityActions,
        entityType,
        hasDelete,
        hasEdit,
        hasItemSelection,
        isBrowse,
        multicolumn,
        reload,
        selectedEntities,
        selectEntities,
        selectEntity,
        setEntity,
        showTopPagiation,
        upsert,
    } = useContext(ListContext);

    return <>
        {
            data.length === 0
                ?
                <NoEntitiesFound />
                :
                <>
                    <Collapse
                        in={showTopPagiation}
                        className="w-full"
                        unmountOnExit
                    >
                        <div className="px-6 w-full">
                            <Pagination />
                        </div>
                        <br />
                    </Collapse>
                    {

                        hasItemSelection ?
                            <div className="w-full flex justify-start px-6">
                                <Tooltip
                                    title={app.t("Select all")}
                                    placement="top"
                                >
                                    <Checkbox
                                        color="primary"
                                        onChange={(event) => {
                                            event.target.checked
                                                ?
                                                selectEntities(data)
                                                :
                                                deselectEntities(data)
                                        }}
                                    />
                                </Tooltip>
                            </div>
                            :
                            null
                    }
                    <div
                        className={"w-full "
                            + (multicolumn ? "grid gap-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 px-6" : "")
                        }
                    >
                        {
                            data.map((item, index) =>
                                <EntityContext.Provider
                                    value={{
                                        entity: item
                                    }}
                                    key={item.id}
                                >
                                    <div
                                        className=
                                        {
                                            'item w-full overflow-hidden relative ' +
                                            (multicolumn ? ' group ' : "py-4 px-6 ") +
                                            (!multicolumn && index !== 0 ? 'border-t ' : '') +
                                            (classProvider ? classProvider(item) : '')
                                        }
                                    >
                                        {
                                            hasItemSelection
                                                ?
                                                <div className="flex flex-row">
                                                    <div className="flex items-center justify-center w-10 ">
                                                        <Checkbox
                                                            checked={selectedEntities.indexOf(item.id) > -1}
                                                            color="primary"
                                                            onChange={(event) => {
                                                                event.target.checked
                                                                    ?
                                                                    selectEntity(item.id)
                                                                    :
                                                                    deselectEntity(item.id)
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        {
                                                            card(item)
                                                        }
                                                    </div>
                                                </div>
                                                :
                                                card(item)
                                        }
                                        {
                                            (entityActions || hasDelete || hasEdit || edit)
                                                ?
                                                <div
                                                    className={(multicolumn ? " bg-white border absolute bottom-0 right-0 z-50 hidden group-hover:flex" : "")}
                                                >
                                                    <EntityActions
                                                        entityActions={entityActions}
                                                    />
                                                </div>
                                                :
                                                null
                                        }
                                    </div>
                                </EntityContext.Provider>
                            )
                        }
                    </div>
                    {
                        !isBrowse &&
                        <div className="px-6 w-full">
                            <Pagination />
                        </div>
                    }
                </>
        }
    </>
}

export default Cards;