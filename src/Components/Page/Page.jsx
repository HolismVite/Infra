import React, { useEffect } from 'react';
import app from '../../Base/App';

const Page = ({
    title,
    subtitle,
    breadcrumbItems,
    children,
    className
}) => {

    useEffect(() => {
        app.emit(app.componentLoaded, {
            pageTitle: title,
            pageSubtitle: subtitle,
            breadcrumbItems: breadcrumbItems
        });
    }, [title, subtitle, breadcrumbItems]);

    return <div
        className={'bg-white py-6 md:rounded-lg ' + className}
    >
        {children}
    </div>
}

export default Page;
export { Page };