import { useState } from 'react'
import Collapse from '@mui/material/Collapse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocalStorageState } from 'Hooks'
import Branding from './Branding';
import User from './User';
import Menu from './Menu';
import HolismIcon from '../Components/HolismIcon';

export default function Sidebar({ onClick }) {
    const [open, setOpen] = useLocalStorageState(true, 'brandingAndMenuIsShown')

    const styles = "dark:text-gray-400"

    return <div className={"h-full overflow-y-auto bg-white dark:bg-slate-900 " + (open && " pt-4 ")}>
        <div className={"cursor-pointer flex justify-center "}
            onClick={() => setOpen(!open)}>
            {
                open
                    ?
                    <HolismIcon className={styles} icon={ExpandLessIcon} />
                    :
                    <HolismIcon className={styles} icon={ExpandMoreIcon} />
            }
        </div>
        <Collapse in={open}>
            <Branding onClick={onClick} />
            <User onClick={onClick} />
        </Collapse>
        <Menu
            onClick={onClick}
            className={open && " mt-5 "}
        />
    </div>
}