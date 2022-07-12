import React, { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import CachedIcon from '@mui/icons-material/Cached';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import ClearIcon from '@mui/icons-material/Clear';
import app from 'App'
import { BrowseContext } from 'Contexts'
import Unify from '../../Unify';
import Field from './Field'
import Pagination from '../../List/Pagination';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Browse = ({
    column,
    browser,
    display,
    choose,
    ...rest
}) => {

    app.ensure([display, browser])

    const [selectedEntity, setSelectedEntity] = useState(null);
    const [isBrowserDialogOpen, setIsBrowserDialogOpen] = useState(false);
    let show;
    let setValue;

    useEffect(() => {
        if (!selectedEntity) {
            show('');
            setValue(null);
            return;
        }
        if (typeof display(selectedEntity) === "undefined") {
            throw new Error(`No dispaly value specified for Browse ${'id'} `)
        }
        else {
            if (typeof choose === "function") {
                try {
                    let chosenValue = choose(selectedEntity);
                    if (typeof chosenValue === "undefined" || typeof chosenValue === "function")
                        throw new Error(`No return value specified for ${column} browser chooser function`)
                    setValue(chosenValue, true);
                } catch (error) {
                    throw new Error(`No return value specified for ${column} browser chooser function`);
                }
            }
            else if (column.endsWith('Guid')) {
                setValue(selectedEntity.guid, true);
            }
            else if (column.endsWith('Id')) {
                setValue(selectedEntity.id, true);
            }
            else {
                throw new Error(`No return value specified for ${column} browser chooser function`);
            }
            show(display(selectedEntity))
        }
    }, [selectedEntity, choose, column, display, setValue, show]);

    const browserDialog = <Dialog
        open={isBrowserDialogOpen}
        fullScreen
        TransitionComponent={Transition}
        onClose={() => setIsBrowserDialogOpen(false)}
    >
        <DialogTitle
            className="bg-gray-100"
        >
            <div className="flex items-center justify-between">
                <div
                    className="flex gap-4 items-center"
                >
                    <IconButton
                        onClick={() => setIsBrowserDialogOpen(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                    <span className="ml-4">{app.t("Find")}</span>
                </div>
                <div
                    dir='ltr'
                    className="listActions flex-1 flex gap-4"
                >
                    {/* <IconButton
                        onClick={() => setIsBrowserDialogOpen(false)}
                    >
                        <CloseIcon />
                    </IconButton> */}
                    {/* <IconButton
                        onClick={() => setIsBrowserDialogOpen(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => setIsBrowserDialogOpen(false)}
                    >
                        <CachedIcon />
                    </IconButton> */}
                </div>
            </div>
        </DialogTitle>
        <DialogContent>
            <BrowseContext.Provider
                value={{
                    selectedEntity,
                    setSelectedEntity,
                    close: () => setIsBrowserDialogOpen(false)
                }}
            >
                <Unify component={browser} />
            </BrowseContext.Provider>
        </DialogContent>
        <DialogActions>
            <Pagination />
        </DialogActions>
    </Dialog>

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
            show = setDisplayValue;
            setValue = setChosenValue;
            return <>
                {
                    browserDialog
                }
                <OutlinedInput
                    label={app.t(label)}
                    value={displayValue}
                    readOnly={true}
                    endAdornment={
                        <InputAdornment
                            disablePointerEvents={progress}
                            disableTypography={progress}
                            position="end"
                        >
                            {
                                selectedEntity
                                    ?
                                    <Tooltip
                                        title={app.t("Clear")}
                                        disableFocusListener={progress}
                                        disableInteractive={progress}
                                        disableTouchListener={progress}
                                    >
                                        <IconButton
                                            disabled={progress}
                                            onClick={() => {
                                                setSelectedEntity(null)
                                            }}
                                            onMouseDown={() => { }}
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    </Tooltip>
                                    :
                                    null
                            }
                            <Tooltip
                                title={app.t("Find")}
                                disableFocusListener={progress}
                                disableInteractive={progress}
                                disableTouchListener={progress}
                            >
                                <IconButton
                                    disabled={progress}
                                    onClick={() => setIsBrowserDialogOpen(true)}
                                    onMouseDown={() => { }}
                                >
                                    <MoreHorizIcon />
                                </IconButton>
                            </Tooltip>
                        </InputAdornment>
                    }
                />
            </>
        }}
    />
}

export default Browse;