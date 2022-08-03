import OutlinedInput from '@mui/material/OutlinedInput';
import app from 'App'
import { useField } from 'Hooks'
import Field from './Field';

const LongText = (props) => {

    const {
        displayValue,
        label,
        setChosenValue,
        setDisplayValue,
        ...field
    } = useField(props)

    return <Field
        type="longText"
        {...props}
        {...field}
    >
        <OutlinedInput
            label={app.t(label)}
            value={displayValue}
            onChange={(e) => {
                setDisplayValue(e.target.value)
                setChosenValue(e.target.value)
            }}
            multiline
            rows={4}
        />
    </Field>
}

export default LongText 