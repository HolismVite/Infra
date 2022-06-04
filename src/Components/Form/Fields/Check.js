import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Field } from '@Form';

const Check = ({
    ...rest
}) => {

    const { change } = rest

    return <Field
        type='check'
        {...rest}
        renderInput={({
            displayValue,
            setDisplayValue,
            setChosenValue,
            label
        }) => {
            return <FormGroup className="">
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
        }}
    />
};

export { Check }