import React, { useState, useEffect, useContext } from 'react';
import { app, TopContext } from './Panel';

const Top = () => {

    const [hasSubtitleOrBreadcrumb, setHasSubtitleOrBreadcrum] = useState();
    const [isShown, setIsShown] = useState(true);
    const {
        params,
        setParams,
        title,
        setTitle,
        subtitle,
        setSubtitle,
        breadcrumbItems,
        setBreadcrumbItems,
        isFreezed,
        setIsFreezed
    } = useContext(TopContext)

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

    const setTop = ({ freeze, title, subtitle, breadcrumbItems }) => {
        setParams({ freeze, title, subtitle, breadcrumbItems })
        if (!isFreezed) {
            setTitle(title);
            setSubtitle(subtitle);
            if (breadcrumbItems && breadcrumbItems.length) {
                setBreadcrumbItems(breadcrumbItems);
            }
        }
        if (typeof freeze === 'boolean') {
            setIsFreezed(freeze);
        }
    }

    useEffect(() => {
        // setTop(params);
    }, [isFreezed])

    useEffect(() => {
        if (app.isSomething(subtitle) || (breadcrumbItems?.length > 0)) {
            setHasSubtitleOrBreadcrum(true);
        }
        else {
            setHasSubtitleOrBreadcrum(false);
        }
    }, [subtitle, breadcrumbItems]);

    return <>
        {
            (app.isNothing(title) && app.isNothing(subtitle) && breadcrumbItems?.length === 0)
                ?
                <div></div>
                :
                <div
                    className=
                    {
                        "mb-7 "
                        + (hasSubtitleOrBreadcrumb ? "h-12" : "h-6")
                        + (isShown ? "" : " hidden")
                        + (app.isRtl() ? " text-right pr-5 lg:pr-0 md:pr-0 " : " pl-5 lg:pl-0 md:pl-0 ")
                    }
                >
                    <div className="font-medium mb-2 tracking-wider	text-xl text-gray-700 dark:text-zinc-400 ">{app.t(title)}</div>
                    {
                        hasSubtitleOrBreadcrumb
                            ?
                            <div className="text-xs tracking-wider text-gray-500">
                                {
                                    app.t(subtitle) ||
                                    (
                                        breadcrumbItems.map((item, index) => <span key={index}>
                                            <span>{app.t(item.title)}</span>
                                            {index === breadcrumbItems.length - 1
                                                ?
                                                null
                                                :
                                                <span className="mx-2" style={{ 'font-size': '10px' }}>/</span>
                                            }
                                        </span>)
                                    )
                                }
                            </div>
                            :
                            null
                    }
                </div>
        }
    </>
}

export default Top;