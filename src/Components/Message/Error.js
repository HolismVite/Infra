import Message from './Message'

const Error = (props) => {
    return <Message
        severity="error"
        {...props}
    />
}

export { Error }