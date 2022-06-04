import React, { useState, useEffect } from 'react';
import app from '../Base/App';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import HeaderActions from '../HeaderActions.js'
import { FullScreen } from './HeaderActions/FullScreen';
import { Maximize } from './HeaderActions/Maximize';
import Collapse from '@mui/material/Collapse';
import DarkMode from './HeaderActions/DarkMode';
import { HolismIcon } from '../Components/HolismIcon';

const Header = ({ onMenuIconClicked }) => {

    const [isShown, setIsShown] = useState(true);

    useEffect(() => {
        const hide = () => {
            setIsShown(false);
        };
        app.on(app.makeRoom, hide);
        return () => {
            app.removeListener(app.makeRoom, hide);
        };
    });

    useEffect(() => {
        const show = () => {
            setIsShown(true);
        };
        app.on(app.returnBackToNormalForm, show);
        return () => {
            app.removeListener(app.returnBackToNormalForm, show);
        };
    });

    return <>
        <Collapse in={isShown}>
            <div
                id='header'
                className={
                    "flex items-center p-5 md:p-10 justify-between h-20"
                    + (app.isRtl() ? " flex-row-reverse " : "")
                }
            >
                <div>
                    <div className='bg-white hover:bg-gray-200 transition-colors rounded-md p-1.5 px-2.5 text-gray-600 cursor-pointer dark:bg-slate-500 dark:hover:bg-slate-400 dark:text-gray-300' onClick={onMenuIconClicked}>
                        <HolismIcon icon={MenuIcon} />
                    </div>
                </div>
                <div
                    className={
                        'flex items-center justify-center'
                        + (app.isRtl() ? " flex-row-reverse " : "")
                    }
                >
                    {
                        // items.map((item, index) => <div onClick={item.onClick || (() => { })} key={item.name} className={(index === 0 ? "" : "ml-6 ") + 'text-gray-600 cursor-pointer hover:text-blue-500'}>
                        //     {item.icon}
                        // </div>)
                        <>
                            <Maximize />
                            <FullScreen />
                            <DarkMode />
                            <HeaderActions />
                        </>
                    }
                </div>
            </div>
        </Collapse>
        <Collapse in={!isShown}>
            <div
                className="m-auto absolute top-0 right-0 left-0 h-0 flex justify-center" onClick={() => app.emit(app.returnBackToNormalForm)}>
                <ExpandMoreIcon style={{ fontSize: 40 }} className="cursor-pointer" />
            </div>
        </Collapse>
    </>
};

export default Header;