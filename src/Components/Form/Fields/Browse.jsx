import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import app from 'App'
import { DialogContext } from 'Contexts'
import { BrowseContext } from 'Contexts'
import BrowserDialog from '../../Browse/BrowserDialog';
import BrowserIcons from '../../Browse/BrowserIcons';
import Field from './Field'

const Browse = ({
    list,
    choose,
    show,
    ...rest
}) => {

    const [open, setOpen] = useState(false);
    const [selectedEntity, setSelectedEntity] = useState(null)

    return <Field
        type='browse'
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
                            if (selectedEntity) 
                            {
                                setChosenValue(choose(selectedEntity))
                                setDisplayValue(show(selectedEntity))
                            }
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
                        value={show(selectedEntity || {})}
                        readOnly={true}
                        endAdornment={<BrowserIcons />}
                    />
                </BrowseContext.Provider>
            </DialogContext.Provider>
        }}
    />
}

export default Browse;