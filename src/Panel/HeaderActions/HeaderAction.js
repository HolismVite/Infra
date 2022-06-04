import HolismIcon from "../../Components/HolismIcon"
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import React, { useState } from 'react';
import app from "../../Base/App";
import { useNavigate } from 'react-router-dom';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const HeaderAction = ({ icon, title, url, action, component, ...rest }) => {

    const navigate = useNavigate();

    const Component = component || (() => <div></div>);

    const [showComponent, setShowComponent] = useState(false);

    const handleClick = () => {
        if (url && app.isSomething(url)) {
            navigate(url);
        }
        else if (action && (typeof action === 'function')) {
            action()
        }
        else if (component) {
            setShowComponent(!showComponent)
        }
        else {
            console.warn('No action is defined for HeaderAction');
        }
    }

    return <div className="headerAction relative select-none">
        <Tooltip title={app.t(title || "")}>
            <div
                //rest
                onClick={(e) => {
                    e.stopPropagation();
                    handleClick();
                }}
                className={
                    'text-gray-600 cursor-pointer hover:text-blue-500 transition-colors dark:text-slate-500 dark:hover:text-slate-300'
                    + (app.isRtl() ? " mr-4 " : " ml-4 ")
                }
            >
                <HolismIcon icon={icon} />
            </div>
        </Tooltip>

        <ClickAwayListener onClickAway={() => setShowComponent(false)}>
            <div>
                <Fade in={showComponent}>
                    <div
                        className={
                            "absolute top-10 z-50 shadow-xl"
                            + (app.isRtl() ? " left-0 " : " right-0 ")
                        }
                    >
                        <Component />
                    </div>
                </Fade>
            </div>
        </ClickAwayListener>
    </div>
}

export { HeaderAction }