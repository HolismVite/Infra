import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import app from 'App'
import { DialogContext } from 'Contexts'
import { BrowseContext } from 'Contexts'
import { useField } from 'Hooks'
import BrowserDialog from '../../Browse/BrowserDialog';
import BrowserIcons from '../../Browse/BrowserIcons';
import Field from './Field'

const Browse = ({
    choose,
    list,
    show,
    ...rest
}) => {

    const [open, setOpen] = useState(false);
    const [selectedEntity, setSelectedEntity] = useState(null)

    const {
        displayValue,
        label,
        progress,
        setChosenValue,
        setDisplayValue,
        ...field
    } = useField({
        choose,
        list,
        show,
        type: 'browse',
        ...rest
    })

    return <Field
        {...field}
        {...rest}
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
                    onSelected: (entity) => {
                        if (entity) {
                            setChosenValue(choose(entity))
                            setDisplayValue(show(entity))
                        }
                    },
                    progress,
                    selectedEntity,
                    setSelectedEntity,
                    small: true,
                    ...rest
                }}
            >
                <BrowserDialog />
                <OutlinedInput
                    label={app.t(label)}
                    value={displayValue}
                    readOnly={true}
                    endAdornment={<BrowserIcons
                        onCleared={() => {
                            setChosenValue('')
                            setDisplayValue('')
                            setSelectedEntity(null)
                        }}
                    />}
                />
            </BrowseContext.Provider>
        </DialogContext.Provider>
    </Field>
}

export default Browse;