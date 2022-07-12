import app from 'App'
import Filter from "./Filter";
import OutlinedInput from '@mui/material/OutlinedInput';
import { useFilter } from 'Hooks'

const Text = ({
    column,
    placeholder,
}) => {

    const {
        id,
        label,
        setValue,
        value,
    } = useFilter({
        column,
        placeholder,
        type: 'text',
    })

    return <Filter
        label={label}
        id={id}
    >
        <OutlinedInput
            size='small'
            value={value}
            label={app.t(label)}
            onChange={(event) => setValue(event.target.value)}
        />
    </Filter>
};

export default Text 