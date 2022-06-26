import React, { useContext } from 'react';
import Collapse from '@mui/material/Collapse';
import app from 'App'
import PanelContext from './PanelContext';

const Footer = () => {

    const { maximized } = useContext(PanelContext)

    return <Collapse in={!maximized}>
        <div
            id='footer'
            className="h-10 flex items-center justify-center text-sm font-semibold text-gray-700 mt-4"
        >
            <span>{app.t("Copyright")} @ 2021</span>
            {
                app.isDev() && <span className="font-bold text-red-400 m-12 animate-pulse">DEV‌ MODE</span>
            }
        </div>
    </Collapse>
};

export default Footer