import { useState } from 'react'
import Collapse from '@mui/material/Collapse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useLocalStorageState from '../Base/UseLocalStorageState'
import Branding from './Branding.js';
import User from './User.js';
import Menu from './Menu.js';
import HolismIcon from '../Components/HolismIcon.js';

export default function Sidebar({ onClick }) {
    const [open, setOpen] = useLocalStorageState(true, 'brandingAndMenuIsShown')

    return (
        <div className="h-full pt-4 dark:bg-slate-900">
            <Collapse in={open}>
                <Branding onClick={onClick} />
                <User onClick={onClick} />
            </Collapse>
            <div className="absolute top-3 left-3 cursor-pointer"
                onClick={() => setOpen(!open)}>
                {
                    open
                        ?
                        <HolismIcon icon={ExpandLessIcon} />
                        :
                        <HolismIcon icon={ExpandMoreIcon} />
                }
            </div>
            <Menu onClick={onClick} />
        </div>
    );
}