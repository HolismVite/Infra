import Message from './Message'

const Warning = (props) => {
    return <Message
        severity="warning"
        {...props}
    />
}

export { Warning }