import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import app from 'App'

const Filter = ({
    children,
    id,
    label,
}) => {

    return <div className="filter w-full">
        <FormControl
            fullWidth
        >
            <InputLabel
                size='small'
                htmlFor={id}
            >
                {app.t(label)}
            </InputLabel>
            {children}
        </FormControl>
    </div>
}

export default Filter;