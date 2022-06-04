import { app } from '@Panel'

const NoItemsFound = ({
    icon,
    title,
    description,
    ctaText
}) => {
    return <div className={'py-10 text-2xl font-bold text-gray-600'}>{app.t("No items found")}</div>
}

export default NoItemsFound