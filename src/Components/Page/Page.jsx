import React, { useEffect, useContext } from 'react';
import { TopContext } from '../../Panel/Panel';

const Page = ({
    title,
    subtitle,
    breadcrumbItems,
    children,
    className
}) => {

	const { setTitle, setSubtitle, setBreadcrumbItems, setFreeze } = useContext(TopContext)

    useEffect(() => {
        setTitle(title)
        setSubtitle(subtitle)
        setBreadcrumbItems(breadcrumbItems)
    }, [title, subtitle, breadcrumbItems]);

    return <div
        className={'bg-white py-6 md:rounded-lg ' + className}
    >
        {children}
    </div>
}

export default Page;
export { Page };