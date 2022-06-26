import OutlinedInput from '@mui/material/OutlinedInput';
import app from 'App'
import Field from './Field';

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

export default LongText 