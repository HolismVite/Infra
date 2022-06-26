import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Text from './Text';

const Phone = (props) => {

    const phoneFormat = /^[\d\(\)-.]*/

    return <Text
        regex={phoneFormat}
        regexError='Phone is not valid'
        startIcon={LocalPhoneIcon}
        {...props}
    />
}

export default Phone 