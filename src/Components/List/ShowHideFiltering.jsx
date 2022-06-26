import { useContext } from 'react'
import Tooltip from '@mui/material/Tooltip'
import FilterListIcon from '@mui/icons-material/FilterList'
import ListContext from './ListContext'

const ShowHideFiltering = () => {

    const {
        filters,
        isFilteringOpen,
        setIsFilteringOpen,
        listActionIconStyle
    } = useContext(ListContext)

    return filters && (filters.props?.children?.length > 0 || filters.props?.children?.props)
        ?
        <span
            id='showHideFiltering'
            className={listActionIconStyle}
            onClick={() => setIsFilteringOpen(!isFilteringOpen)}
        >
            <Tooltip title={app.t('Filters')}>
                <FilterListIcon />
            </Tooltip>
        </span>
        :
        null
}

export default ShowHideFiltering