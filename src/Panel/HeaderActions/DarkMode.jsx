import { useContext } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import HeaderAction from './HeaderAction';
import { PanelContext } from 'Contexts'

const DarkMode = () => {

    const { isDark, setIsDark } = useContext(PanelContext)

    return <HeaderAction
        title={isDark ? 'Go light' : 'Go dark'}
        icon={isDark ? LightModeIcon : DarkModeIcon}
        action={() => {
            setIsDark(!isDark)
        }}
    />
}

export default DarkMode;