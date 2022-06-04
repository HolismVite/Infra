import React, { useEffect } from 'react';
import app from '../../Base/App';

const Dashboard = ({
    title,
    subtitle,
    breadcrumbItems,
    children
}) => {

    useEffect(() => {
        app.emit(app.componentLoaded, {
            pageTitle: title,
            pageSubtitle: subtitle,
            breadcrumbItems: breadcrumbItems
        });
    }, [title, subtitle, breadcrumbItems]);

    return <div
        className="dashboard py-6 grid gap-6 "
    >
        {children}
    </div>
}

export default Dashboard;
export { Dashboard };
export { Section } from './Section';
export { Widget } from './Widget';