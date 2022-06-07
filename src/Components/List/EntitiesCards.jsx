import React, { useContext } from 'react';
import Pagination from './Pagination';
import EntityActions from './EntityActions/EntityActions';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import { ListContext, app } from '@List';
import NoEntitiesFound from '../NoEntitiesFound';

const Cards = ({
    data,
    entityActions,
    menuForActions,
    hasDelete,
    hasEdit,
    edit,
    entityType,
    create,
    upsert,
    metadata,
    card,
    multicolumn,
    setItem,
    reload,
    hasItemSelection,
    classProvider,
    showTopPagiation,
    noItemIsFoundStyle
}) => {

    const listContext = useContext(ListContext);
    const { selectedItems } = listContext;

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
                                    title="Select all"
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
                                        inputProps={{ 'aria-label': 'Select all' }}
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
                                <div
                                    className=
                                    {
                                        'item w-full overflow-hidden group relative ' +
                                        (multicolumn ? '' : "py-4 px-6 ") +
                                        (!multicolumn && index !== 0 ? 'border-t ' : '') +
                                        (classProvider ? classProvider(item) : '')
                                    }
                                    key={item.id}
                                    dir={app.isRtl() ? "rtl" : "ltr"}
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
                                                    menuForActions={menuForActions}
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