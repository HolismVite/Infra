import DatePicker from '@mui/lab/DatePicker';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Field, app } from '@Form';

const DateTime = (props) => {

    return <Field
        renderInput={({ displayValue, setDisplayValue, setChosenValue, label, progress }) => {
            return <DatePicker
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

export { DateTime };