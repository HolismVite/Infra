import React, { useState, useEffect } from 'react';
import app from '../Base/App';

const Title = () => {

    const [params, setParams] = useState('');
    const [pageTitle, setPageTitle] = useState('');
    const [pageSubtitle, setPageSubtitle] = useState('');
    const [breadcrumbItems, setBreadcrumbItems] = useState([]);
    const [hasSubtitleOrBreadcrumb, setHasSubtitleOrBreadcrum] = useState();
    const [isShown, setIsShown] = useState(true);
    const [isFreezed, setIsFreezed] = useState(false);

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

    const setTitleAndSubtitle = ({ freeze, pageTitle, pageSubtitle, breadcrumbItems }) => {
        setParams({ freeze, pageTitle, pageSubtitle, breadcrumbItems })
        if (!isFreezed) {
            setPageTitle(pageTitle);
            setPageSubtitle(pageSubtitle);
            if (breadcrumbItems && breadcrumbItems.length) {
                setBreadcrumbItems(breadcrumbItems);
            }
        }
        if (typeof freeze === 'boolean') {
            setIsFreezed(freeze);
        }
    }

    useEffect(() => {
        setTitleAndSubtitle(params);
    }, [isFreezed])

    useEffect(() => {
        app.on(app.componentLoaded, setTitleAndSubtitle);
        return () => {
            app.removeListener(app.componentLoaded, setTitleAndSubtitle);
        }
    });

    useEffect(() => {
        if (app.isSomething(pageSubtitle) || (breadcrumbItems.length > 0)) {
            setHasSubtitleOrBreadcrum(true);
        }
        else {
            setHasSubtitleOrBreadcrum(false);
        }
    }, [pageSubtitle, breadcrumbItems]);

    return <>
        {
            (app.isNothing(pageTitle) && app.isNothing(pageSubtitle) && breadcrumbItems.length === 0)
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
                    <div className="font-medium mb-2 tracking-wider	text-xl text-gray-700 dark:text-zinc-400 ">{app.t(pageTitle)}</div>
                    {
                        hasSubtitleOrBreadcrumb
                            ?
                            <div className="text-xs tracking-wider text-gray-500">
                                {
                                    app.t(pageSubtitle) ||
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

export default Title;