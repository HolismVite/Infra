import { useContext } from 'react'
import Tooltip from '@mui/material/Tooltip'
import CachedIcon from '@mui/icons-material/Cached'
import { ListContext } from './Contexts'
import app from '../../Base/App'

const Reload = () => {

    const { listActionIconStyle } = useContext(ListContext)

    return <span
        id='reload'
        onClick={() => app.emit(app.reloadRequested)}
        className={listActionIconStyle}
    >
        <Tooltip title={app.t('Reload')}>
            <CachedIcon />
        </Tooltip>
    </span>
}

export default Reload