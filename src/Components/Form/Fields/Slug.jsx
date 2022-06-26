import LinkIcon from '@mui/icons-material/Link';
import Text from './Text';

const Slug = (props) => {
    const slugFormat = /^[a-z0-9-]*$/;
    // todo: add separate slug for each language or locale that extends this slug

    return <Text
        column="Slug"
        placeholder="Slug"
        required="Slug is not provided"
        startIcon={LinkIcon}
        regex={slugFormat}
        hint="valid-slug-sample"
        regexError='Slug is not valid. Only dash and lowercase English characters, and numbers are accepted.'
        {...props}
    />
}

export default Slug;