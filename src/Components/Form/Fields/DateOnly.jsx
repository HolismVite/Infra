import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import OutlinedInput from '@mui/material/OutlinedInput';
import app from 'App'
import { useField } from 'Hooks'
import Field from './Field';

const DateOnly = (props) => {

    const field = useField(props)
    const {
        displayValue,
        label,
        progress,
        setChosenValue,
        setDisplayValue,
    } = field

    return <Field
        type='date'
        {...props}
        {...field}
    >
        <DatePicker
            value={displayValue}
            disabled={progress}
            onChange={(date) => {
                setDisplayValue(date)
                setChosenValue(date)
            }}
            renderInput={({
                inputRef,
                inputProps,
                InputProps
            }) => <OutlinedInput
                    label={app.t(label)}
                    endAdornment={InputProps?.endAdornment}
                    ref={inputRef}
                    inputProps={inputProps}
                />}
        />
    </Field>
}

export default DateOnly;