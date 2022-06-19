import React, { useContext } from 'react';
import Pagination from './Pagination';
import EntityActions from './EntityActions/EntityActions';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import { ListContext, app } from '@List';
import NoEntitiesFound from '../NoEntitiesFound';
import { EntityContext, TableContext } from './Contexts'
import useList from '../../Hooks/useList';

const Table = () => {

    const {
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
        headers,
        hiddenEntityActions,
        menuForActions,
        reload,
        row,
        selectEntities,
        selectEntity,
        selectedEntities,
        separateRowForActions,
        setEntity,
        showTopPagiation,
        upsert,
    } = useContext(ListContext);

    let headerElements = [];

    if (headers) {

        headerElements = React.Children
            .toArray(headers.props.children)
            .map(header => React.cloneElement(header, {
                className: "text-gray-900 dark:text-gray-300 py-3 font-light text-xs "
                    + (header?.props?.start && " ltr:text-left rtl:text-right ")
                    + (header?.props?.className || ""),
                start: header?.props?.start ? 'true' : 'false',
                children: React.Children.toArray(header.props.children).map(child => {
                    return typeof child === "string" ? app.t(child) : child;
                })
            }));
    }

    const head =

        <thead>
            <tr className={
                'text-xs uppercase font-light border-b h-10'
                + (app.getLocale().supportsLetterSpacing && " tracking-wider ")
            }>
                {
                    hasItemSelection ?
                        <th>
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
                                    inputProps={{ 'aria-label': app.t('Select all') }}
                                />
                            </Tooltip>
                        </th>
                        :
                        null
                }
                {
                    headerElements
                }
                {
                    (entityActions || hasDelete)
                        ?
                        !hiddenEntityActions && <td></td>
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
                checked={selectedEntities?.indexOf(item.id) > -1}
                color="primary"
                onChange={(event) => {
                    event.target.checked
                        ?
                        selectEntity(item.id)
                        :
                        deselectEntity(item.id)
                }}
            />
        </td>
        :
        null

    const clonedCells = (item) => React.Children
        .toArray(row(item).props.children)
        .map(td => React.cloneElement(td, {
            className: 'text-gray-900 dark:text-gray-300 py-3 text-sm font-light tracking-wide '
                + (td?.props?.start && " ltr:text-left rtl:text-right ")
                + td.props.className,
            hasmoreroom: menuForActions
        }))

    const actions = (item) => (entityActions || hasDelete || hasEdit || edit)
        ?
        !hiddenEntityActions && <td {...(separateRowForActions && { colSpan: "100" })}>
            <EntityActions
                entityActions={entityActions}
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
                        <td colSpan='100'><NoEntitiesFound /></td>
                    </tr>
                    :
                    data.map((item, index) => !menuForActions && separateRowForActions
                        ?
                        <React.Fragment key={item.id}>
                            <EntityContext.Provider
                                value={{
                                    entity: item
                                }}
                            >
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
                            </EntityContext.Provider>
                        </React.Fragment>
                        :
                        <EntityContext.Provider
                            key={item.id}
                            value={{
                                entity: item
                            }}
                        >
                            <tr
                                className={rowStyle(item, index, true)}
                            >
                                {itemSelection(item)}
                                {clonedCells(item)}
                                {actions(item)}
                            </tr>
                        </EntityContext.Provider>
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
                        <Pagination />
                    </div>
                </Collapse>
        }
        <div className="relative w-full overflow-x-auto px-6">
            <TableContext.Provider
                value={{
                    hasMoreRoom: !menuForActions && separateRowForActions && !hiddenEntityActions
                }}>
                <table
                    className="w-full text-center "
                    style={{ minWidth: '600px' }}
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
                    <Pagination />
                </div>
        }
    </>
};

export default Table;