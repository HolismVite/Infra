import Button from './Button'

const PrimaryButton = (props) => {
    return <Button
        {...props}
        color="error"
    />
}

export { PrimaryButton }