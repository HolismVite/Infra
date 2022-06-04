import { Link } from 'react-router-dom'
import { Fragment, useState } from 'react'
import { useLocation } from "react-router-dom"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import BiotechIcon from '@mui/icons-material/Biotech'
import Collapse from '@mui/material/Collapse'
import menuItems from '../Menu.js'
import HolismIcon from '../Components/HolismIcon.js'
import app from '../Base/App'

let items = menuItems;
if (app.isDev()) {
    items = [...menuItems, {
        title: 'Test',
        icon: BiotechIcon,
        url: '/test'
    }]
}

const liStyle = "py-2 hover:bg-gray-50 dark:hover:bg-blue-900 cursor-pointer text-sm tracking-wide text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white font-normal relative select-none"
const iconStyle = "text-gray-600 hover:text-gray-900"

const leftBlueLine = (url) => {
    if (url === window.location.pathname) {
        return <span
            className={
                "w-2 bg-blue-600 h-full absolute top-0"
                + (
                    app.isRtl()
                        ?
                        " rounded-tl-md rounded-bl-md right-0 "
                        :
                        " rounded-tr-md rounded-br-md left-0 "
                )
            }
        ></span>
    }
}

const MenuItemWithSubmenu = ({ item, onClick }) => {
    let location = useLocation()

    const [isSubmenuOpen, setIsSubmenuOpen] = useState(() => {
        var isOpen = item.children.filter(i => i.url === location.pathname).length > 0
        return isOpen
    })
    const openSubmenu = () => {
        setIsSubmenuOpen(!isSubmenuOpen)
    }
    return (
        <Fragment key={app.t(item.title)}>
            {/* <li className="navigation-divider">{item.title}</li> */}
            <div
                className={liStyle + (
                    isSubmenuOpen
                        ?
                        " pb-0"
                        :
                        ""
                )}
                onClick={openSubmenu}
            >
                <span
                    className=
                    {
                        "px-9 flex items-center h-full"
                        + (app.isRtl() ? " flex-row-reverse " : "")
                    }
                >
                    <span
                        className=
                        {
                            "flex items-center"
                            + (app.isRtl() ? " ml-3 " : " mr-3 ")
                        }
                    >
                        {
                            <HolismIcon icon={item.icon} />
                        }
                    </span>
                    <span>{app.t(item.title)}</span>
                    <span
                        className={
                            "flex-1 flex "
                            + (app.isRtl() ? "" : " flex-row-reverse ")
                        }
                    >
                        <span
                            className={
                                "transition-all "
                                + (isSubmenuOpen ? " transform rotate-180 " : "  ")
                            }
                        >
                            <ExpandMoreIcon
                            />
                        </span>
                    </span>
                </span>
                <Collapse in={isSubmenuOpen}>
                    <div className=" pt-2">
                        {
                            item.children.filter(item => {
                                if (item.superAdmin === true) {
                                    return app.isSuperAdmin()
                                }
                                else {
                                    return true
                                }
                            }).map((child, index) => {
                                return <Link
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onClick()
                                    }}
                                    to={child.url}
                                    key={index}
                                    className={
                                        liStyle
                                        + " flex items-center hover:bg-gray-100"
                                        + (child.url === location.pathname ? " bg-gray-200 text-blue-800 hover:text-blue-800 dark:bg-slate-600 dark:text-slate-200 dark:hover:text-slate-100" : '')
                                        + (app.isRtl() ? " flex-row-reverse " : "")
                                    }
                                >
                                    {
                                        leftBlueLine(child.url)
                                    }
                                    <span className={app.isRtl() ? "mr-20" : "ml-20"}>{app.t(child.title)}</span>
                                </Link>
                            })
                        }
                    </div>
                </Collapse>
            </div>

        </Fragment>
    )
}

const Menu = ({ onClick }) => {
    let location = useLocation()

    return <div id="menu" className="mt-5 dark:bg-slate-900">
        {
            items.filter(item => {
                if (item.superAdmin === true) {
                    return app.isSuperAdmin()
                }
                else {
                    return true
                }
            }).map((item, index) => {
                if (item.children && item.children.length > 0) {
                    return <MenuItemWithSubmenu key={index} item={item} onClick={onClick} />
                }
                else {
                    if (!item.children && !item.url) {
                        throw new Error(`Holism way of defining submenu items is via 'children' property. Please either provide a 'url' property for top-level menu items, or specify their 'children' in ${JSON.stringify(item)}.`)
                    }
                    if (item.children && item.children.length === 0) {
                        throw new Error('Please remove menu items with zero childrens. Empty children array is not valid.')
                    }
                    return (<Fragment key={index}>
                        <Link
                            onClick={onClick}
                            to={item.url}
                            className={
                                liStyle
                                + " flex items-center relative"
                                + (item.url === location.pathname ? " bg-gray-200 hover:bg-gray-400 text-blue-800 hover:text-blue-800 dark:bg-slate-700 dark:text-slate-200 dark:hover:text-slate-100" : '')
                                + (app.isRtl() ? " flex-row-reverse " : "")
                            }
                        >
                            <span
                                className={
                                    "px-9 flex items-cener"
                                    + (app.isRtl() ? " flex-row-reverse " : "")
                                }
                            >
                                <span
                                    className={
                                        iconStyle
                                        + (app.isRtl() ? " ml-3 " : " mr-3 ")
                                    }
                                >
                                    {
                                        <HolismIcon icon={item.icon} className="dark:text-slate-600" />
                                    }
                                </span>
                                {
                                    leftBlueLine(item.url)
                                }
                                <span className="flex items-center">{app.t(item.title)}</span>
                            </span>
                        </Link>
                    </Fragment>)
                }
            })
        }
    </div>
}

export default Menu