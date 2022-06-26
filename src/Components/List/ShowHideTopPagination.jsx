import { useContext } from 'react'
import Tooltip from '@mui/material/Tooltip'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import { ListContext } from 'Contexts'

const ShowHideTopPagination = () => {

    const {
        isTree,
        hasData,
        showTopPagiation,
        setTopPaginationVisibility,
        listActionIconStyle
    } = useContext(ListContext)

    return !isTree && hasData && <span
        id='showHideTopPagination'
        className={listActionIconStyle}
        onClick={() => setTopPaginationVisibility(!showTopPagiation)}
    >
        <Tooltip title={app.t(showTopPagiation ? 'Hide top pagination' : 'Show top pagination')}>
            <SwapHorizIcon />
        </Tooltip>
    </span>
}

export default ShowHideTopPagination