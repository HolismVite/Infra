import React, { useEffect, useContext } from 'react';
import { TopContext, app } from '@Panel'

const Dashboard = ({
    title,
    subtitle,
    breadcrumbItems,
    children
}) => {

    const { setTitle, setSubtitle, setBreadcrumbItems } = useContext(TopContext)

    useEffect(() => {
        setTitle(title)
        setSubtitle(subtitle)
        setBreadcrumbItems(breadcrumbItems)
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