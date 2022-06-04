import OutlinedInput from '@mui/material/OutlinedInput';
import { app, Field } from '@Form';

const LongText = (props) => {

    return <Field
        type="longText"
        {...props}
        renderInput={({ displayValue, setDisplayValue, setChosenValue, label }) => {
            return <OutlinedInput
                label={app.t(label)}
                value={displayValue}
                onChange={(e) => {
                    setDisplayValue(e.target.value)
                    setChosenValue(e.target.value)
                }}
                multiline
                rows={4}
            />
        }}
    />
}

export { LongText }