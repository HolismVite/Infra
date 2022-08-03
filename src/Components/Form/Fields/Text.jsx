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

    const field = useField({
        validate: textValidate,
        ...rest
    })
    const {
        displayValue,
        setDisplayValue,
        setChosenValue,
        label,
        progress,
    } = field

    return <Field
        type='text'
        {...rest}
        {...field}
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