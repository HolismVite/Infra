import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import OutlinedInput from '@mui/material/OutlinedInput';
import app from 'App'
import { useField } from 'Hooks'
import Field from './Field';

const DateTime = (props) => {

    const {
        displayValue,
        label,
        progress,
        setChosenValue,
        setDisplayValue,
        ...field
    } = useField(props)

    return <Field
        type="datetime"
        {...props}
        {...field}
    >
        <DateTimePicker
            format="MM/dd/yyyy HH:mm"
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

export default DateTime;