import app from 'App'

const NoEntitiesFound = ({
    icon,
    title,
    description,
    ctaText
}) => {
    return <div className={'py-10 text-2xl font-bold text-gray-600'}>{app.t("No items found")}</div>
}

export default NoEntitiesFound