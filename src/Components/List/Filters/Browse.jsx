import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import app from 'App'
import { DialogContext } from 'Contexts'
import { BrowseContext } from 'Contexts'
import { useBrowser } from 'Hooks'
import BrowserDialog from '../../Browse/BrowserDialog';
import BrowserIcons from '../../Browse/BrowserIcons';
import Filter from './Filter'

const Browse = ({
    list,
    choose,
    column,
    show,
    ...rest
}) => {

    app.ensure([show])

    const [open, setOpen] = useState(false);

    const {
        selectedEntity,
        setSelectedEntity,
        progress,
    } = useBrowser({
        show,
        choose,
        column,
        setValue: (value) => { console.log(value) }
    })

    return <Filter
        type='browse'
        column={column}
        {...rest}
        renderInput={({
            label,
            setValue,
            value,
        }) => {
            return <DialogContext.Provider
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
                        value={value}
                        size='small'
                        onChange={(e) => setValue(chosenValue)}
                        endAdornment={<BrowserIcons />}
                    />
                </BrowseContext.Provider>
            </DialogContext.Provider>
        }}
    />
}

export default Browse;