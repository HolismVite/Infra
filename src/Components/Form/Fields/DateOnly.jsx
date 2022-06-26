import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import OutlinedInput from '@mui/material/OutlinedInput';
import app from '../../../Base/App';
import Field from './Field';

const DateOnly = (props) => {

    return <Field
        type='date'
        {...props}
        renderInput={({ displayValue, setDisplayValue, setChosenValue, label, progress }) => {
            return <DatePicker
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
        }}
    />
}

export default DateOnly ;