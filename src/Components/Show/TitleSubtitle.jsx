import { app } from '@Panel'

const TitleSubtitle = ({ title, subtitle }) => {
    return <div className={"ltr:text-left rtl:text-right"}>
        <div className="text-lg font-bold text-slate-600 dark:text-slate-400">{title}</div>
        <div className="text-xs text-gray-400">{subtitle}</div>
    </div>
}

export default TitleSubtitle 