import app from 'App'
import Filter from "./Filter";
import OutlinedInput from '@mui/material/OutlinedInput';

const Text = ({ column, placeholder }) => {

    return <Filter
        type='text'
        column={column}
        placeholder={placeholder}
        renderInput={({
            label,
            setValue,
            value,
        }) => {
            return <OutlinedInput
                size='small'
                value={value}
                label={app.t(label)}
                onChange={(event) => setValue(event.target.value)}
            />
        }}
    />
};

export default Text 