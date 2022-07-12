import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import app from 'App'
import { DialogContext } from 'Contexts'
import { BrowseContext } from 'Contexts'
import { useBrowser } from 'Hooks'
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

    const {
        chosenValue,
        selectedEntity,
        setSelectedEntity,
        shownValue,
    } = useBrowser({
        show,
        choose,
        column,
    })

    return <Field
        type='browse'
        column={column}
        {...rest}
        renderInput={({
            label,
            progress,
            setChosenValue,
            setDisplayValue,
        }) => {
            return <DialogContext.Provider
                value={{
                    open,
                    setOpen
                }}
            >
                <BrowseContext.Provider
                    value={{
                        close: () => setOpen(false),
                        list,
                        onSelected: () => {
                            setChosenValue(chosenValue)
                            setDisplayValue(shownValue)
                        },
                        progress,
                        selectedEntity,
                        setSelectedEntity,
                        small: true,
                    }}
                >
                    <BrowserDialog />
                    <OutlinedInput
                        label={app.t(label)}
                        value={shownValue}
                        readOnly={true}
                        endAdornment={<BrowserIcons />}
                    />
                </BrowseContext.Provider>
            </DialogContext.Provider>
        }}
    />
}

export default Browse;