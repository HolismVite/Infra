import OutlinedInput from '@mui/material/OutlinedInput';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import app from 'App'
import { useField } from 'Hooks'
import Field from './Field';

const Time = (props) => {

    const field = useField(props)
    const {
        displayValue,
        label,
        progress,
        setChosenValue,
        setDisplayValue,
    } = field

    return <Field
        type="time"
        {...props}
        {...field}
    >
        <TimePicker
            label={app.t(label)}
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

export default Time;