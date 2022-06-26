import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import OutlinedInput from '@mui/material/OutlinedInput';
import app from 'App'
import Field from './Field';

const DateTime = (props) => {

    return <Field
        type="datetime"
        {...props}
        renderInput={({
            displayValue,
            setDisplayValue,
            setChosenValue,
            label,
            progress
        }) => {
            return <DateTimePicker
                format="MM/dd/yyyy HH:mm"
                value={displayValue}
                disabled={progress}
                onChange={(date) => {
                    setDisplayValue(date)
                    setChosenValue(date)
                }}
                KeyboardButtonProps={{
                    'aria-label': app.t('Change') + ' ' + app.t(label),
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
        }}
    />
}

export default DateTime ;