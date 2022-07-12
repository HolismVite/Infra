import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import app from 'App'
import { DialogContext } from 'Contexts'
import { BrowseContext } from 'Contexts'
import { useBrowser } from 'Hooks'
import { useFilter } from 'Hooks'
import BrowserDialog from '../../Browse/BrowserDialog';
import BrowserIcons from '../../Browse/BrowserIcons';
import Field from './Field'

const Browse = ({
    list,
    choose,
    column,
    placeholder,
    show,
    ...rest
}) => {

    app.ensure([show])

    const [open, setOpen] = useState(false);

    let tempFunc

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

    return <Field
        type='browse'
        column={column}
        {...rest}
        renderInput={({
            displayValue,
            label,
            progress,
            setChosenValue,
            setDisplayValue,
        }) => {
            show = setDisplayValue
            tempFunc = setChosenValue;
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
                        value={selectedEntity ? show(selectedEntity) : ''}
                        readOnly={true}
                        endAdornment={<BrowserIcons />}
                    />
                </BrowseContext.Provider>
            </DialogContext.Provider>
        }}
    />
}

export default Browse;