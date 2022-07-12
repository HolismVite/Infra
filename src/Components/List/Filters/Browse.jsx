import React, { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import app from 'App'
import { filterOperator } from 'App'
import { DialogContext } from 'Contexts'
import { BrowseContext } from 'Contexts'
import { useFilter } from 'Hooks'
import BrowserDialog from '../../Browse/BrowserDialog';
import BrowserIcons from '../../Browse/BrowserIcons';
import Filter from './Filter'

const Browse = ({
    choose,
    column,
    placeholder,
    show,
    ...rest
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

    useEffect(() => {
        if (!entity) {
            setSelectedEntity(null)
        }
    }, [entity])

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
                    onSelected: i => setEntity(i),
                    selectedEntity,
                    setSelectedEntity,
                    small: true,
                    ...rest
                }}
            >
                <BrowserDialog />
                <OutlinedInput
                    label={app.t(label)}
                    value={shown}
                    readOnly={true}
                    size='small'
                    endAdornment={<BrowserIcons onCleared={() => setEntity(null)} />}
                />
            </BrowseContext.Provider>
        </DialogContext.Provider>
    </Filter>
}

export default Browse;