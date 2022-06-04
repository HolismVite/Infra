import { Text } from './Text';
import LinkIcon from '@mui/icons-material/Link';
import { app } from '../Exports';

const Link = (props) => {
    const urlFormat = /http(s)?.*/;

    const validate = (url) => {
        if (url.startsWith('/')) {
            return true;
        }
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return true;
        }
        if (app.isNothing(url)) {
            return true;
        }
        return {
            error: 'url',
            message: 'URL should start with / or https:// or http://'
        }
    }

    return <Text
        // regex={urlFormat}
        // regexError='Link is not valid'
        validate={validate}
        startIcon={LinkIcon}
        {...props}
    />
}

export { Link };