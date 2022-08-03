import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useField } from 'Hooks'
import Field from './Field';

const Check = ({
    ...rest
}) => {

    const { change } = rest

    const {
        displayValue,
        label,
        setChosenValue,
        setDisplayValue,
        ...field
    } = useField(rest)

    return <Field
        type='check'
        {...rest}
        {...field}
    >
        <FormGroup className="">
            <FormControlLabel
                control={<Checkbox

                />}
                label={label}
                checked={displayValue || false}
                onChange={(e) => {
                    setDisplayValue(e.target.checked)
                    setChosenValue(e.target.checked)
                    if (change && typeof change === 'function') {
                        change(e.target.checked)
                    }
                }}
            />
        </FormGroup>
    </Field>
};

export default Check 