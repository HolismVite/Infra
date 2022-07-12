import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import app from 'App'
import filterOperator from 'App'
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

    const [open, setOpen] = useState(false)
    const [selectedEntity, setSelectedEntity] = useState(null)

    const {
        chosen,
        entity,
        id,
        label,
        setEntity,
        shown,
    } = useFilter({
        choose,
        column,
        operator: filterOperator.equals,
        placeholder,
        selectedEntity,
        show,
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
                    close: () => setOpen(false),
                    list,
                    onSelected: i => setEntity(i),
                    selectedEntity,
                    setSelectedEntity,
                    small: true,
                }}
            >
                <BrowserDialog />
                <OutlinedInput
                    label={app.t(label)}
                    value={shown}
                    readOnly={true}
                    size='small'
                    endAdornment={<BrowserIcons />}
                />
            </BrowseContext.Provider>
        </DialogContext.Provider>
    </Filter>
}

export default Browse;