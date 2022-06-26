import React, { useState, useEffect, useContext } from 'react';
import app from 'App'
import { PanelContext } from 'Contexts'
import { TopContext } from 'Contexts'

const Top = () => {

    const [hasSubtitleOrBreadcrumb, setHasSubtitleOrBreadcrum] = useState();
    const { maximized, setMaximized } = useContext(PanelContext)
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
                        + (maximized && " hidden ")
                        + (app.isRtl() ? " text-right pr-5 lg:pr-0 md:pr-0 " : " pl-5 lg:pl-0 md:pl-0 ")
                    }
                >
                    <div className={"font-medium mb-2 text-xl text-gray-700 dark:text-zinc-400 " + (app.getLocale().supportsLetterSpacing && "tracking-wider	")}>{app.t(title)}</div>
                    {
                        hasSubtitleOrBreadcrumb
                            ?
                            <div className={"text-xs text-gray-500 dark:text-zinc-400 " + (app.getLocale().supportsLetterSpacing && " tracking-wider ")}>
                                {
                                    app.t(subtitle) ||
                                    (
                                        breadcrumbItems?.map((item, index) => <span key={index}>
                                            <span>{app.t(item.title)}</span>
                                            {index === breadcrumbItems?.length - 1
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