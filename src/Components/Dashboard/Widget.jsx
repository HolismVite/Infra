import { app } from 'Panel';
import HolismIcon from "../HolismIcon";

const Widget = ({
    title,
    icon,
    color,
    menuItems,
    span,
    allSiblingsCount,
    children
}) => {

    return <div
        className={
            "widget bg-white md:rounded-lg p-6 dark:bg-zinc-700 "
        }
    >
        {
            (title || icon)
                ?
                <div
                    className={
                        "widgetTopBar flex items-start justify-between mb-4 "
                    }
                >
                    {
                        title
                            ?
                            <div
                                className={
                                    "uppercase text-sm text-gray-800 font-light truncate cursor-default dark:text-gray-400 "
                                    + " mb-3 "
                                    + (app.getLocale().supportsLetterSpacing && " tracking-wider ")
                                }
                                title={app.t(title)}
                            >
                                {app.t(title)}
                            </div>
                            :
                            null
                    }
                    {
                        icon
                            ?
                            <div
                                className=
                                {
                                    "w-10 h-10 rounded-full flex justify-center items-center text-white "
                                    + (color || " bg-green-400 ")
                                }
                            >
                                <HolismIcon icon={icon} />
                            </div>
                            :
                            null
                    }
                </div>
                :
                null
        }
        {children}
    </div>
}

export default Widget