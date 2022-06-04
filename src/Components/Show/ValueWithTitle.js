const ValueWithTitle = ({ value, title }) => {
    return <div title={title || ""}>
        {value}
    </div>
}

export { ValueWithTitle }