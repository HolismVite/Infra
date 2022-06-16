const FunctionComponent = ({children}) => {
    return <div>
        <h1>I am a function component</h1>
        <p>I can also have children and props</p>
        {children}
    </div>
}

export default FunctionComponent