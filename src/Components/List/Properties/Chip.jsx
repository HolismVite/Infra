import app from 'App'

const Chip = ({
    text,
    className
}) => {
    return <span className={"py-1 px-3 rounded-full text-xs inline-block " + className}>
        {app.t(text)}
    </span>
}

export default Chip 