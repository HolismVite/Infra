import Text from './Text'

const Numeric = ({
    naturalNumbers,
    integers,
    realNumbers,
    ...rest
}) => {
    return <Text
        {...rest}
    />
}

export default Numeric