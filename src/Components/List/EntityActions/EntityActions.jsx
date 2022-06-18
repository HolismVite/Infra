import React, { useState, useContext } from 'react';
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
import { ListContext } from '../Contexts';

const EntityActions = ({
    entityType,
    entity,
    entityActions,
    edit,
    create,
    upsert,
    setItem,
    reload,
    className
}) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const {
        menuForActions,
        hasDelete,
        hasEdit
    } = useContext(ListContext)
    const open = Boolean(anchorEl);
    let clonedEntityActions = [];

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    if (entityActions) {
        let entityActionsArray = null;
        if (typeof entityActions === 'function') {
            entityActionsArray = entityActions(entity).props.children
            if (entityActionsArray && entityActionsArray.props && entityActionsArray.props.children) {
                entityActionsArray = entityActionsArray.props.children
            }
        }
        else {
            entityActionsArray = entityActions.props.children
        }

        if (entityActionsArray) {
            clonedEntityActions = React
                .Children
                .toArray(entityActionsArray)
                .filter(entityAction => {
                    try {
                        if (entityAction.props?.superAdmin === true) {
                            return app.isSuperAdmin()
                        }
                        else if (
                            entityAction.type &&
                            typeof entityAction.type === 'function' &&
                            entityAction.props &&
                            entityAction.type(entityAction.props).props?.superAdmin === true) {
                            return app.isSuperAdmin()
                        }
                        else {
                            return true;
                        }
                    } catch (error) {
                        console.error(error, entityAction)
                    }
                    return true;
                })
                .map(entityAction => React.cloneElement(entityAction, {
                    entity: entity,
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
            entity={entity}
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
            entity={entity}
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
                    clonedEntityActions.map((entityAction, index) => entityAction)
                }
                {deleteRecord}
                {editRecord}
                {viewRecord}
            </Menu>
        </>
        :
        <span className={className}>
            {
                entity.progress
                    ?
                    <span className="flex flex-wrap items-center justify-end px-2">
                        <Fade in={entity.progress}>
                            <CircularProgress size={24} className="mt-2" />
                        </Fade>
                    </span>
                    :
                    <span className="flex flex-wrap items-center justify-end">
                        {/* <Fade in={!entity.progress}> */}
                        <>
                            {
                                clonedEntityActions.map((entityAction, index) => entityAction)
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

export default EntityActions;