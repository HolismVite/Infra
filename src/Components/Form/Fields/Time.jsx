import OutlinedInput from '@mui/material/OutlinedInput';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import app from '../../../Base/App';
import Field from './Field';

const Time = (props) => {

    return <Field
        type="time"
        {...props}
        renderInput={({ displayValue, setDisplayValue, setChosenValue, label, progress }) => {
            return <TimePicker
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
        }}
    />
}

export default Time ;