import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import app from 'App'
import fieldStyles from './FieldStyle'

const Field = ({
    children,
    helpText,
    id,
    isValid,
    label,
    progress,
    required,
    type,
}) => {

    return <div className={fieldStyles}>
        <FormControl
            error={isValid() ? false : true}
            fullWidth
            required={required ? true : false}
            disabled={progress}
        >
            {
                type !== 'check' && type !== 'upload' && <InputLabel
                    htmlFor={id}
                    disableAnimation={progress}
                    disabled={progress}
                >
                    {app.t(label)}
                </InputLabel>
            }
            {children}
            <FormHelperText
                disabled={progress}
            >
                {app.t(helpText) || " "}
            </FormHelperText>
        </FormControl>
    </div>
};

export default Field;