import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import { app, Field } from '@Form'
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

    return <Field
        type='text'
        {...rest}
        validate={textValidate}
        renderInput={({
            displayValue,
            setDisplayValue,
            setChosenValue,
            label,
            progress
        }) => {
            return <OutlinedInput
                label={app.t(label)}
                value={displayValue}
                startAdornment={startIcon && <InputAdornment
                    disablePointerEvents={progress}
                    disableTypography={progress}
                    position="start">
                    <HolismIcon icon={startIcon} />
                </InputAdornment>}
                onChange={(e) => {
                    setDisplayValue(e.target.value)
                    setChosenValue(e.target.value)
                }}
            />
        }}
    />
};

export { Text }