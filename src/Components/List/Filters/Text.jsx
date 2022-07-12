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
        setEntity,
        shown,
    } = useFilter({
        choose: i => i,
        column,
        placeholder,
        show: i => i,
        type: 'text',
    })

    return <Filter
        label={label}
        id={id}
    >
        <OutlinedInput
            size='small'
            value={shown}
            label={app.t(label)}
            onChange={(event) => setEntity(event.target.value)}
        />
    </Filter>
};

export default Text 