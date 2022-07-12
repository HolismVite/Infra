import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import app from 'App'
import { DialogContext } from 'Contexts'
import { BrowseContext } from 'Contexts'
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

    const [open, setOpen] = useState(false)
    const [selectedEntity, setSelectedEntity] = useState(null)

    const {
        id,
        label,
    } = useFilter({
        choose,
        column,
        placeholder,
        selectedEntity,
        type: 'browse',
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
                    value={show(selectedEntity || {})}
                    readOnly={true}
                    size='small'
                    endAdornment={<BrowserIcons />}
                />
            </BrowseContext.Provider>
        </DialogContext.Provider>
    </Filter>
}

export default Browse;