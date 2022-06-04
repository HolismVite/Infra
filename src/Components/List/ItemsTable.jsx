import React, { useContext } from 'react';
import Pagination from './Pagination';
import ItemActions from './ItemActions/ItemActions';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import { ListContext, HolismIcon, app } from '@List';
import { useLocalStorageState } from '../../Base/UseLocalStorageState'
import NoItemsFound from '../NoItemsFound';

export const TableContext = React.createContext();

const Table = ({
    entityType,
    data,
    metadata,
    headers,
    row,
    itemActions,
    separateRowForActions,
    menuForActions,
    hasDelete,
    hasEdit,
    edit,
    create,
    upsert,
    setItem,
    reload,
    hasItemSelection,
    classProvider,
    showTopPagiation
}) => {

    const listContext = useContext(ListContext);
    const { selectedItems, hasData } = listContext;
    const [hiddenItemActions, setHiddenItemActions] = useLocalStorageState(false, `${app.userGuid()}_${entityType}_isItemActionsHidden`)

    let headerElements = [];

    if (headers) {

        headerElements = React.Children
            .toArray(headers.props.children)
            .map(header => React.cloneElement(header, {
                className: "text-gray-900 dark:text-gray-300 py-3 font-light text-xs " + (header?.props?.className || ""),
                children: React.Children.toArray(header.props.children).map(child => {
                    return typeof child === "string" ? app.t(child) : child;
                })
            }));
    }

    const head =

        <thead>
            <tr className='text-xs uppercase font-light tracking-wider border-b'>
                {
                    hasItemSelection ?
                        <>
                            <th>
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
                            </th>
                        </>
                        :
                        null
                }
                {
                    headerElements
                }
                {
                    (itemActions || hasDelete)
                        ?
                        !hiddenItemActions && <td></td>
                        :
                        null
                }
            </tr>
        </thead>

    const rowStyle = (item, index, hasBottomBorder) => 'py-3 ' +
        ((hasBottomBorder && index !== data.length - 1) ? 'border-b ' : ' ') +
        (classProvider ? classProvider(item) : '')

    const itemSelection = (item) => hasItemSelection
        ?
        <td>
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
        </td>
        :
        null

    const clonedCells = (item) => React.Children
        .toArray(row(item).props.children)
        .map(td => React.cloneElement(td, {
            className: 'text-gray-900 dark:text-gray-300 py-3 text-sm font-light tracking-wide ' + td.props.className,
            hasmoreroom: menuForActions
        }))

    const actions = (item) => (itemActions || hasDelete || hasEdit || edit)
        ?
        !hiddenItemActions && <td {...(separateRowForActions && { colSpan: "100" })}>
            <ItemActions
                entityType={entityType}
                item={item}
                itemActions={itemActions}
                menuForActions={menuForActions}
                hasDelete={hasDelete}
                hasEdit={hasEdit}
                edit={edit}
                create={create}
                upsert={upsert}
                setItem={setItem}
                reload={reload}
            />
        </td>
        :
        null

    const body = <tbody>
        {
            row && typeof row === 'function'
                ?
                data.length === 0
                    ?
                    <tr>
                        <td colSpan='100'><NoItemsFound /></td>
                    </tr>
                    :
                    data.map((item, index) => !menuForActions && separateRowForActions
                        ?
                        <React.Fragment key={item.id}>
                            <tr
                                className={rowStyle(item, index, false)}
                            >
                                {itemSelection(item)}
                                {clonedCells(item)}
                            </tr>
                            <tr
                                className={rowStyle(item, index, true)}
                            >
                                {actions(item)}
                            </tr>
                        </React.Fragment>
                        :
                        <tr
                            key={item.id}
                            className={rowStyle(item, index, true)}
                        >
                            {itemSelection(item)}
                            {clonedCells(item)}
                            {actions(item)}
                        </tr>
                    )
                :
                null
        }
    </tbody>

    return <>
        {
            data.length === 0
                ?
                null
                :
                <Collapse in={showTopPagiation} className="w-full">
                    <div className="w-full px-6">
                        <Pagination metadata={metadata} />
                    </div>
                </Collapse>
        }
        <div className="relative w-full overflow-x-auto px-6">
            {
                !menuForActions && hasData && (itemActions || hasDelete || hasEdit || edit) &&
                <span
                    className={"absolute top-0 right-6 cursor-pointer "}
                    onClick={() => setHiddenItemActions(!hiddenItemActions)}
                    title="Toggle actions"
                >
                    <HolismIcon
                        className={hiddenItemActions ? "text-slate-300" : "text-green-600"}
                        icon={hiddenItemActions ? ToggleOnIcon : ToggleOffIcon}
                    />
                </span>
            }
            <TableContext.Provider
                value={{
                    hasMoreRoom: !menuForActions && separateRowForActions && !hiddenItemActions
                }}>
                <table
                    className="w-full text-center "
                    style={{ minWidth: '600px' }}
                    dir={app.isRtl() ? "rtl" : "ltr"}
                >
                    {head}
                    {body}
                </table>
            </TableContext.Provider >
        </div>
        {
            data.length === 0
                ?
                null
                :
                <div className="pt-8 w-full px-6">
                    <Pagination metadata={metadata} />
                </div>
        }
    </>
};

export default Table;