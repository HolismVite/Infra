import { useContext } from 'react'
import { HeaderAction } from "./HeaderAction"
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { PanelContext } from "../Contexts";

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

export { Maximize }