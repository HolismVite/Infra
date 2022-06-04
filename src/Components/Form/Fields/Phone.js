import { Text } from './Text';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const Phone = (props) => {

    const phoneFormat = /^[\d\(\)-.]*/

    return <Text
        regex={phoneFormat}
        regexError='Phone is not valid'
        startIcon={LocalPhoneIcon}
        {...props}
    />
}

export { Phone }