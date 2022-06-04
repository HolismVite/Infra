import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useNavigate } from 'react-router-dom';
import { HolismIcon, app, Unify } from '@List';

const ItemAction = ({
    title,
    item,
    icon,
    click,
    goTo,
    dialog,
    setItem,
    reload,
    color,
    hoverOnly,
    superAdmin,
    asMenuItem,
    closeMenu
}) => {

    const navigate = useNavigate();

    const handleClick = (e) => {
        app.selectedItem = item;
        if (goTo) {
            app.selectedItem = item;
            if (typeof goTo === 'function') {
                navigate(goTo(item));
            }
            else {
                navigate(goTo);
            }
        }
        else if (click && typeof click === 'function') {
            click({ item, setProgress, setItem, reload })
        }
        else if (dialog) {
            app.emit(app.itemActionDialogRequested, {
                entity: item,
                purpose: title
            })
        }
        else {
            console.warn(`No action is assigned to item action. Title is '${title}'`)
        }
        e.stopPropagation()
        e.preventDefault()
        e.nativeEvent.stopPropagation()
        e.nativeEvent.preventDefault()
    }

    let DialogInstanceCloned = null

    if (dialog) {
        const DialogInstance = dialog(item)
        DialogInstanceCloned = React.cloneElement(DialogInstance, {
            entityId: item.id,
            dialogPurpose: title
        })
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
        <span className="itemAction flex items-center justify-center">
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
                dialog && DialogInstanceCloned
            }
        </span >
};

export { ItemAction }