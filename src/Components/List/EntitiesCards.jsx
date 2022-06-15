import React, { useContext } from 'react';
import Pagination from './Pagination';
import EntityActions from './EntityActions/EntityActions';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import { ListContext, app } from '@List';
import NoEntitiesFound from '../NoEntitiesFound';
import { EntityContext } from './Contexts'

const Cards = ({
    data,
    entityActions,
    hasDelete,
    hasEdit,
    edit,
    entityType,
    create,
    upsert,
    metadata,
    multicolumn,
    setItem,
    reload,
    classProvider,
    showTopPagiation,
    noItemIsFoundStyle
}) => {

    const {
        hasItemSelection,
        selectedItems,
        card,
    } = useContext(ListContext);

    return <>
        {
            data.length === 0
                ?
                <NoEntitiesFound />
                :
                <>
                    <Collapse in={showTopPagiation} className="w-full">
                        <div className="px-6 w-full">
                            <Pagination metadata={metadata} />
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
                                                app.addItemsToSelectedItems(listContext, data)
                                                :
                                                app.removeItemsFromSelectedItems(listContext, data)
                                        }}
                                        inputProps={{ 'aria-label': app.t('Select all') }}
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
                                >
                                    <div
                                        className=
                                        {
                                            'item w-full overflow-hidden group relative ' +
                                            (multicolumn ? '' : "py-4 px-6 ") +
                                            (!multicolumn && index !== 0 ? 'border-t ' : '') +
                                            (classProvider ? classProvider(item) : '')
                                        }
                                        key={item.id}
                                    >
                                        {
                                            hasItemSelection
                                                ?
                                                <div className="flex flex-row">
                                                    <div className="flex items-center justify-center w-10 mr-4">
                                                        <Checkbox
                                                            checked={selectedItems.indexOf(item.id) > -1}
                                                            color="primary"
                                                            onChange={(event) => {
                                                                event.target.checked
                                                                    ?
                                                                    app.addItemToSelectedItems(listContext, item.id)
                                                                    :
                                                                    app.removeItemFromSelectedItems(listContext, item.id)
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
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
                                                        entityType={entityType}
                                                        item={item}
                                                        entityActions={entityActions}
                                                        hasDelete={hasDelete}
                                                        hasEdit={hasEdit}
                                                        edit={edit}
                                                        create={create}
                                                        upsert={upsert}
                                                        setItem={setItem}
                                                        reload={reload}
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
                    <div className="px-6 w-full">
                        <Pagination metadata={metadata} />
                    </div>
                </>
        }
    </>
}

export default Cards;