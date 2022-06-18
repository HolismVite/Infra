import { useContext } from 'react'
import Tooltip from '@mui/material/Tooltip'
import Switch from '@mui/material/Switch';
import { ListContext } from './Contexts'
import app from '../../Base/App';

const ShowHideEntityActions = ({ className }) => {

    const {
        menuForActions,
        hasData,
        entityActions,
        hasDelete,
        hasEdit,
        edit,
        hiddenEntityActions,
        setHiddenEntityActions,
    } = useContext(ListContext)

    return !menuForActions && hasData && (entityActions || hasDelete || hasEdit || edit) &&
        <Tooltip title={hiddenEntityActions ? app.t('Show actions') : app.t('Hide actions')}>
            <Switch
                size="small"
                checked={!hiddenEntityActions}
                onChange={(e) => setHiddenEntityActions(!hiddenEntityActions)}
            />
        </Tooltip>
}

export default ShowHideEntityActions