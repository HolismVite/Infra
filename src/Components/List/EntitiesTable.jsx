import React, { useContext } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import app from 'App'
import { ListContext } from 'Contexts'
import { TableContext } from 'Contexts'
import { EntityContext } from 'Contexts'
import Pagination from './Pagination';
import EntityActions from './EntityActions/EntityActions';
import NoEntitiesFound from '../NoEntitiesFound';

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
        hasGuid,
        hasItemSelection,
        hasKey,
        hasOrder,
        hasSlug,
        headers,
        hiddenEntityActions,
        isBrowse,
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
            .filter(header => {
                if (header.props && header.props.superAdmin) {
                    return app.isSuperAdmin()
                }
                return true;
            })
            .map(header => {
                if (header.props.children.props) {
                    return header.props.children
                }
                return header
            })
            .map(header => {
                const { start, superAdmin, ...rest } = header.props
                return <header.type
                    className={"text-gray-900 dark:text-gray-300 py-3 font-light text-xs "
                        + (header?.props?.start && " ltr:text-left rtl:text-right ")
                        + (header?.props?.className || "")}
                    key={header.key}
                    ref={header.ref}
                    {...rest}
                >
                    {
                        React.Children.toArray(header.props.children).map(child => {
                            return typeof child === "string" ? app.t(child) : child;
                        })
                    }
                </header.type>
            });
    }

    const head =

        <thead>
            <tr className={
                'text-xs uppercase font-light border-b h-10'
                + (app.getLocale().supportsLetterSpacing && " tracking-wider ")
            }>
                {
                    hasOrder && <th></th>
                }
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

    const drag = (item) => hasOrder &&
        <td>
            <DragIndicatorIcon className="cursor-move" />
        </td>

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
        .filter(item => {
            if (item.props && item.props.superAdmin) {
                return app.isSuperAdmin()
            }
            return true
        })
        .map(td => {
            const { start, superAdmin, ...rest } = td.props
            return <td.type
                key={td.key}
                ref={td.ref}
                className={'text-gray-900 dark:text-gray-300 py-3 text-sm font-light tracking-wide '
                    + (td?.props?.start && " ltr:text-left rtl:text-right ")
                    + td.props.className}
                hasmoreroom={menuForActions}
            >
                {td.props.children}
            </td.type>
        })

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
                                    {drag(item)}
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
                                {drag(item)}
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
        <div className={"relative w-full overflow-x-auto " + (!isBrowse && " px-6 ")}>
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
                !isBrowse
                &&
                <div className="pt-8 w-full px-6">
                    <Pagination />
                </div>
        }
    </>
};

export default Table;