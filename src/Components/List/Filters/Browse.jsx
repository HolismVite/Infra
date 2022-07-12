import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import app from 'App'
import { DialogContext } from 'Contexts'
import { BrowseContext } from 'Contexts'
import { useBrowser } from 'Hooks'
import { useFilter } from 'Hooks'
import BrowserDialog from '../../Browse/BrowserDialog';
import BrowserIcons from '../../Browse/BrowserIcons';
import Filter from './Filter'

const Browse = ({
    list,
    choose,
    column,
    placeholder,
    show,
}) => {

    app.ensure([show])

    const [open, setOpen] = useState(false);

    const {
        id,
        entity,
        label,
        setEntity,
    } = useFilter({
        column,
        placeholder,
        type: 'browse',
    })

    const {
        selectedEntity,
        setSelectedEntity,
        progress,
    } = useBrowser({
        show,
        choose,
        column,
        setValue: setEntity
    })

    return <Filter
        label={label}
        id={id}
    >
        <DialogContext.Provider
            value={{
                open,
                setOpen
            }}
        >
            <BrowseContext.Provider
                value={{
                    progress,
                    small: true,
                    selectedEntity,
                    setSelectedEntity,
                    list,
                    close: () => setOpen(false)
                }}
            >
                <BrowserDialog />
                <OutlinedInput
                    label={app.t(label)}
                    value={entity ? show(entity) : ''}
                    size='small'
                    endAdornment={<BrowserIcons />}
                />
            </BrowseContext.Provider>
        </DialogContext.Provider>
    </Filter>
}

export default Browse;