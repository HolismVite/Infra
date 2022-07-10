import React, { useState, useEffect } from 'react';
import Input from '@mui/material/Input';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import app from 'App'
import { BrowseContext } from 'Contexts'
import Filter from "./Filter";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Browse = ({ column, placeholder, entityType, browser, display, choose }) => {

    const [selectedEntity, setSelectedEntity] = useState(null);
    const [isBrowserDialogOpen, setIsBrowserDialogOpen] = useState(false);
    const [displayValue, setDisplayValue] = useState("");
    const [chosenValue, setChosenValue] = useState("");

    // todo: on resetting filters, setSelectedEntity(null);

    useEffect(() => {
        if (!selectedEntity) {
            setDisplayValue(null);
            setChosenValue(null);
            return;
        }
        setDisplayValue(display(selectedEntity));
        if (choose && typeof choose === 'function') {
            setChosenValue(choose(selectedEntity));
        }
        else {
            if (column.endsWith('Guid')) {
                setChosenValue(selectedEntity.guid);
            }
            else if (column.endsWith('Id')) {
                setChosenValue(selectedEntity.id);
            }
        }
    }, [choose, column, display, selectedEntity]);

    const browserDialog = <Dialog
        open={isBrowserDialogOpen}
        fullScreen
        TransitionComponent={Transition}
        onClose={() => setIsBrowserDialogOpen(false)}
    >
        <DialogTitle
            className="bg-gray-100"
        >
            <div className="flex items-center">
                <IconButton
                    onClick={() => setIsBrowserDialogOpen(false)} aria-label="close"
                >
                    <CloseIcon />
                </IconButton>
                <span className="ml-4">{"Find " + entityType || ""}</span>
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
            <div id='actions' className='mt-4'>
                {
                    <div className="mr-6 mb-6" >
                        <Button
                            variant="outlined"
                            onClick={() => setIsBrowserDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                }
            </div>
        </DialogActions>
    </Dialog>

    return <>
        {browserDialog}
        <Filter
            type='text'
            column={column}
            placeholder={app.t(placeholder)}
            renderInput={(value, setValue) => <Input
                value={displayValue}
                onChange={(e) => setValue(chosenValue)}
                // startAdornment={
                //     <InputAdornment position="start">
                //     </InputAdornment>
                // }
                endAdornment={
                    <InputAdornment position="end">
                        <Tooltip title={"Find " + (entityType || "")}>
                            <IconButton
                                aria-label={"Find " + entityType}
                                onClick={() => setIsBrowserDialogOpen(true)}
                                onMouseDown={() => { }}
                            >
                                <MoreHorizIcon />
                            </IconButton>
                        </Tooltip>
                    </InputAdornment>
                }
            />}
        />
    </>
}

export default Browse;