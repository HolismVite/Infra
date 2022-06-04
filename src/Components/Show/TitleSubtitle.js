const TitleSubtitle = ({ title, subtitle }) => {
    return <div className="text-left">
        <div className="text-lg font-bold text-slate-600">{title}</div>
        <div className="text-xs text-gray-400">{subtitle}</div>
    </div>
}

export { TitleSubtitle }