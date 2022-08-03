import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { filterOperator } from 'App'
import { useFilter } from 'Hooks'
import Filter from "./Filter"

const Boolean = ({ column, label }) => {

    const {
        id,
        entity,
        setEntity,
    } = useFilter({
        choose: i => i,
        column,
        operator: filterOperator.equals,
        show: i => i,
        type: 'boolean',
    })

    return <Filter
        id={id}
    >
        <FormGroup className="">
            <FormControlLabel
                control={<Checkbox

                />}
                label={label}
                checked={entity || false}
                onChange={(e) => setEntity(e.target.checked)}
            />
        </FormGroup>
    </Filter>
}

export default Boolean