import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import app from 'App'
import { useField } from 'Hooks'
import Field from './Field'
import HolismIcon from '../../HolismIcon'

const Text = ({
    regex,
    regexError,
    validate,
    startIcon,
    ...rest
}) => {

    const textValidate = ({ displayValue }) => {
        if (regex && regex.test && app.isSomething(displayValue)) {
            if (displayValue.match(regex)) {
                return true;
            }
            else {
                return {
                    error: 'regex',
                    message: regexError
                }
            }
        }
        if (validate && typeof validate === 'function') {
            return validate(displayValue)
        }
    }

    const {
        displayValue,
        setDisplayValue,
        setChosenValue,
        label,
        progress,
        ...field
    } = useField(rest)

    return <Field
        type='text'
        {...rest}
        {...field}
        validate={textValidate}
    >
        <OutlinedInput
            label={app.t(label)}
            value={displayValue}
            startAdornment={
                startIcon &&
                <InputAdornment
                    disablePointerEvents={progress}
                    disableTypography={progress}
                    position="start"
                >
                    <HolismIcon
                        progress={progress}
                        icon={startIcon}
                    />
                </InputAdornment>
            }
            onChange={(e) => {
                setDisplayValue(e.target.value)
                setChosenValue(e.target.value)
            }}
        />
    </Field>


};

export default Text 