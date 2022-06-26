import React, { useState, useEffect } from 'react'
import { Helmet } from "react-helmet";
import { Transition } from '@headlessui/react'
import MainRouting from '../Base/MainRouting';
import Sidebar from './Sidebar';
import Header from './Header';
import app from 'App'
import useLocalStorageState from '../Base/UseLocalStorageState';
import Footer from './Footer';
import Message from './Message';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Top from './Top';
import PanelContext from './PanelContext';
import TopContext from './TopContext';
// https://dev.to/codeply/helpful-page-layouts-using-tailwind-css-1a3k
// import TrapFocus from '@mui/material/Unstable_TrapFocus';
// import Backdrop from '@mui/material/Backdrop';

// require('react-dom');
// window.React2 = require('react');
// if (window.React1 !== window.React2) {
//     // console.warn('two reacts outside component');
// }

const Panel = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useLocalStorageState(true, 'isSidebarOpen')
    const [isDark, setIsDark] = useLocalStorageState(false, `isDark_${app.userGuid()}`)
    const [maximized, setMaximized] = useLocalStorageState(false, `maximized_${app.userGuid()}`)

    const [params, setParams] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [breadcrumbItems, setBreadcrumbItems] = useState([]);
    const [isFreezed, setIsFreezed] = useState(false);

    const [isMessageShown, setIsMessageShown] = useState()
    const [message, setMessage] = useState()
    const [action, setAction] = useState()
    const [severity, setSeverity] = useState()

    const toggleMenu = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    // require('react-dom');
    // window.React2 = require('react');
    // if (window.React1 !== window.React2) {
    //     // console.warn('two reacts inside component');
    // }

    const closeMenu = () => {
        if (window.innerWidth < app.breakpoints.lg) {
            setIsSidebarOpen(false);
        }
    }

    useEffect(() => {
        if (maximized) {
            setIsSidebarOpen(false)
        }
        else {
            setIsSidebarOpen(true)
        }
    }, [maximized]);

    useEffect(() => {
        if (isDark) {
            document.body.classList.add('dark')
        }
        else {
            document.body.classList.remove('dark')
        }
    }, [isDark])

    return <PanelContext.Provider
        value={{
            isSidebarOpen,
            setIsSidebarOpen,
            isDark,
            setIsDark,
            isMessageShown,
            setIsMessageShown,
            message,
            setMessage,
            action,
            setAction,
            severity,
            setSeverity,
            maximized,
            setMaximized
        }}>
        {
            app.getLocale().key === 'fa' &&
            <Helmet>
                <link type="text/css" rel="stylesheet" href="/Fonts/Persian/fontiran.css" />
                <link type="text/css" rel="stylesheet" href="/Fonts/Persian/style.css" />
            </Helmet>
        }
        {
            app.getLocale().key === 'ar' &&
            <Helmet>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
                <link type="text/css" rel="stylesheet" href="/Fonts/Arabic/style.css" />
            </Helmet>
        }
        <input type='hidden' id='reactVersion' value={React.version} />
        <div
            className={
                "flex "
                + (isDark ? ' dark ' : '')
            }
        >
            {
                isSidebarOpen && <div
                    // enter="transition-all duration-300"
                    // enterFrom="-ml-64"
                    // enterTo="ml-0"
                    // leave="transition-all duration-300"
                    // leaveFrom="ml-0"
                    // leaveTo="-ml-64"
                    className={
                        "w-72 absolute border-b z-10 bg-white dark:bg-slate-900 top-0 bottom-0 "
                        + " ltr:border-r rtl:border-l "
                        +
          /*large*/"lg:w-1/5 lg:static lg:border-b-0 "
                        + (app.isRtl() ? " lg:border-l-0 " : " lg:border-r-0 ")
                        +
          /*xlarge*/ ""
                        +
          /*2x large*/ "2xl:w-1/6"
                    }
                >
                    <ClickAwayListener onClickAway={closeMenu}>
                        <div
                            id='thisDivShouldNotBeRemovedToFixRefProblemOfSidebar'
                        >
                            <Sidebar onClick={closeMenu} />
                        </div>
                    </ClickAwayListener>
                </div>
            }
            <div
                className=
                {
        /*small*/"flex-1 flex flex-col min-h-screen"
                    /*medium*/
                    + " dark:bg-zinc-900 transition-colors"
                }
            >
                <Header onMenuIconClicked={toggleMenu} />
                <div
                    id='content'
                    className="md:p-10 md:pt-4 pt-5 flex-1"
                >
                    <TopContext.Provider
                        value={{
                            title,
                            setTitle,
                            subtitle,
                            setSubtitle,
                            breadcrumbItems,
                            setBreadcrumbItems,
                            isFreezed,
                            setIsFreezed,
                            // setTop
                        }}
                    >
                        <Top />
                        <MainRouting />
                    </TopContext.Provider>
                </div>
                <Footer />
                <Message />
            </div>
        </div>
    </PanelContext.Provider>
}

export default Panel