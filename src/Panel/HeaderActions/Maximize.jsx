import { useContext } from 'react'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import HeaderAction from "./HeaderAction"
import { PanelContext } from 'Contexts'

const Maximize = () => {

    const { setMaximized } = useContext(PanelContext)

    return <HeaderAction
        title="Maximize"
        icon={ExpandLessIcon}
        action={() => {
            setMaximized(true)
        }}
    />
}

export default Maximize 