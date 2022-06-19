import React, { useState, useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useNavigate } from 'react-router-dom';
import { HolismIcon, app, Unify } from '@List';
import useMessage from '../../../Hooks/useMessage'
import { ListContext } from '../Contexts';

const EntityAction = ({
    asMenuItem,
    click,
    closeMenu,
    color,
    dialog,
    entity,
    goTo,
    hoverOnly,
    icon,
    reload,
    setEntity,
    superAdmin,
    title,
    ...rest
}) => {

    const navigate = useNavigate()
    const { success, error } = useMessage()
    const [isOpen, setIsOpen] = useState(false)
    const { reloadEntity } = useContext(ListContext)

    const handleClick = (e) => {
        app.selectedItem = entity;
        if (goTo) {
            app.selectedItem = entity;
            if (typeof goTo === 'function') {
                navigate(goTo(entity));
            }
            else {
                navigate(goTo);
            }
        }
        else if (click && typeof click === 'function') {
            click({
                error,
                entity,
                reload,
                setEntity,
                setProgress,
                success,
            })
        }
        else if (dialog) {
            setIsOpen(true)
        }
        else {
            console.warn(`No action is assigned to entity action. Title is '${title}'`)
        }
        e.stopPropagation()
        e.preventDefault()
        e.nativeEvent.stopPropagation()
        e.nativeEvent.preventDefault()
    }

    const [progress, setProgress] = useState(false);

    if (superAdmin && !app.isSuperAdmin()) {
        return <span className="hidden"></span>
    }

    return asMenuItem ?
        <>
            <MenuItem onClick={(e) => {
                handleClick(e)
                if (closeMenu && typeof closeMenu === 'function') {
                    // closeMenu()
                }
            }}>
                <ListItemIcon>
                    <HolismIcon
                        icon={icon}
                        className={color}
                    />
                </ListItemIcon>
                <ListItemText>{app.t(title || "")}</ListItemText>
            </MenuItem>
            {
                dialog && DialogInstanceCloned
            }
        </>
        :
        <span className="entityAction flex items-center justify-center">
            {
                (progress || progress === true)
                    ?
                    <CircularProgress size={24} className="m-2" />
                    :
                    <Tooltip title={app.t(title || "")}>
                        <IconButton onClick={handleClick}>
                            {
                                <HolismIcon
                                    icon={icon}
                                    className={color}
                                />
                                // <CircularProgress
                                //     variant="determinate"
                                //     value={100}
                                //     size={20}
                                // />
                            }
                        </IconButton>
                    </Tooltip>
            }
            {
                dialog &&
                <Unify
                    component={dialog}
                    entity={entity}
                    dialogPurpose={title}
                    isOpen={isOpen}
                    reloadEntity={reloadEntity}
                    close={() => setIsOpen(false)}
                    onClosed={() => setIsOpen(false)}
                    setEntity={setEntity}
                    {...rest}
                />
            }
        </span >
};

export { EntityAction }