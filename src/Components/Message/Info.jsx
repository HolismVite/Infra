import Message from './Message'

const Info = (props) => {
    return <Message
        severity="info"
        {...props}
    />
}

export { Info }