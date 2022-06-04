import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteAction from './DeleteAction';
import EditAction from './EditAction';
import { app } from '../../../Base/App';
import ViewRecordAction from './ViewRecordAction';

const ItemActions = ({
    entityType,
    item,
    itemActions,
    menuForActions,
    hasDelete,
    hasEdit,
    edit,
    create,
    upsert,
    setItem,
    reload,
    className
}) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    let clonedItemActions = [];

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    if (itemActions) {
        let itemActionsArray = null;
        if (typeof itemActions === 'function') {
            itemActionsArray = itemActions(item).props.children
            if (itemActionsArray && itemActionsArray.props && itemActionsArray.props.children) {
                itemActionsArray = itemActionsArray.props.children
            }
        }
        else {
            itemActionsArray = itemActions.props.children
        }

        if (itemActionsArray) {
            clonedItemActions = React
                .Children
                .toArray(itemActionsArray)
                .filter(itemAction => {
                    try {
                        if (itemAction.props?.superAdmin === true) {
                            return app.isSuperAdmin()
                        }
                        else if (
                            itemAction.type &&
                            typeof itemAction.type === 'function' &&
                            itemAction.props &&
                            itemAction.type(itemAction.props).props?.superAdmin === true) {
                            return app.isSuperAdmin()
                        }
                        else {
                            return true;
                        }
                    } catch (error) {
                        console.error(error, itemAction)
                    }
                    return true;
                })
                .map(itemAction => React.cloneElement(itemAction, {
                    item: item,
                    setItem: setItem,
                    reload: reload,
                    asMenuItem: menuForActions,
                    closeMenu: handleClose
                }))
        }
    }

    const deleteRecord = hasDelete
        ?
        <DeleteAction
            entityType={entityType}
            item={item}
            asMenuItem={menuForActions}
            closeMenu={handleClose}
        />
        :
        null

    /*
        upsert={UpsertEntity}
        hasEdit={true}
        edit={(entity) => `/entity/edit/${entity.id}`}
        edit={EditEntity}

        either upsert, or edit URL, or edit component, or create + hasEdit
    */
    const editRecord = (hasEdit && create) || edit || upsert
        ?
        <EditAction
            entityType={entityType}
            item={item}
            create={create}
            hasEdit={hasEdit}
            edit={edit}
            upsert={upsert}
            asMenuItem={menuForActions}
            closeMenu={handleClose}
        />
        :
        null

    const viewRecord = app.isDev() &&
        <ViewRecordAction
            entityType={entityType}
            item={item}
            create={create}
            hasEdit={hasEdit}
            edit={edit}
            upsert={upsert}
            asMenuItem={menuForActions}
            closeMenu={handleClose}
        />

    return menuForActions
        ?
        <>
            <IconButton
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: app.isRtl() ? 'left' : 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: app.isRtl() ? 'left' : 'right',
                }}
            >

                {
                    clonedItemActions.map((itemAction, index) => itemAction)
                }
                {deleteRecord}
                {editRecord}
                {viewRecord}
            </Menu>
        </>
        :
        <span className={className}>
            {
                item.progress
                    ?
                    <span className="flex flex-wrap items-center justify-end px-2">
                        <Fade in={item.progress}>
                            <CircularProgress size={24} className="mt-2" />
                        </Fade>
                    </span>
                    :
                    <span className="flex flex-wrap items-center justify-end">
                        {/* <Fade in={!item.progress}> */}
                        <>
                            {
                                clonedItemActions.map((itemAction, index) => itemAction)
                            }
                            {deleteRecord}
                            {editRecord}
                            {viewRecord}
                        </>
                        {/* </Fade> */}
                    </span>
            }
        </span>
}

export default ItemActions;