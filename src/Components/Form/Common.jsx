import { Text } from 'Form'

const Title = ({ optional }) => {
    const props = {}
    if (!optional) {
        props.required = 'Please provide the title'
    }
    return <Text
        column='Title'
        placeholder='Title'
        {...props}
    />
}

export { Title }