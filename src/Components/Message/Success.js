import Message from './Message'

const Success = (props) => {
    return <Message
        severity="success"
        {...props}
    />
}

export { Success }