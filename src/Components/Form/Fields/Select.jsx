import MenuItem from '@mui/material/MenuItem';
import MuiSelect from '@mui/material/Select';
import app from '../../../Base/App';
import Field from './Field'

const Select = ({
    hasEmpty,
    options,
    display,
    choose,
    ...rest
}) => {

    return <Field
        type='select'
        {...rest}
        renderInput={({ displayValue, setDisplayValue, setChosenValue, label }) => {
            return <MuiSelect
                value={displayValue}
                label={app.t(label)}
                onChange={(e) => {
                    setDisplayValue(e.target.value)
                    setChosenValue(e.target.value)
                }}
            >
                {
                    hasEmpty
                        ?
                        <MenuItem value="">
                            <em>{app.t('Please choose')}</em>
                        </MenuItem>
                        :
                        null
                }
                {
                    options.map(option => <MenuItem key={option.id} value={choose(option)}>{app.t(display(option))}</MenuItem>)
                }
            </MuiSelect>
        }}
    />
};

export default Select 