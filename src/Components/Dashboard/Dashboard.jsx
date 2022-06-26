import React, { useEffect, useContext } from 'react';
import { TopContext } from 'Contexts'

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

export default Dashboard