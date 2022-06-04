import React, { useState, useEffect } from 'react';
import app from '../Base/App';
import Collapse from '@mui/material/Collapse';

const Footer = () => {

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

    return <Collapse in={isShown}>
        <div
            id='footer'
            className="h-10 flex items-center justify-center text-sm font-semibold text-gray-700 mt-4"
            dir={app.isRtl() ? "rtl" : "ltr"}
        >
            <span>{app.t("Copyright")} @ 2021</span>
            {
                app.isDev() && <span className="font-bold text-red-400 m-12 animate-pulse">DEV‌ MODE</span>
            }
        </div>
    </Collapse>
};

export default Footer;