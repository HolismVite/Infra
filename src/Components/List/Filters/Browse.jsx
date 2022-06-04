import app from "../../../Base/App";
import Filter from "./Filter";
import Input from '@mui/material/Input';
import React, { useState, useEffect } from 'react';
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Browse = ({ column, placeholder, entityType, browser, display, choose }) => {

    const [selectedEntity, setSelectedEntity] = useState(null);
    const [isBrowserDialogOpen, setIsBrowserDialogOpen] = useState(false);
    const [displayValue, setDisplayValue] = useState("");
    const [chosenValue, setChosenValue] = useState("");

    const clonedBrowser = React.cloneElement(browser(), {
        callerId: `${column}_browser`
    });

    useEffect(() => {
        const reset = () => {
            setSelectedEntity(null);
        };
        app.on(app.resetFilters, reset);
        return () => {
            app.removeListener(app.resetFilters, reset);
        }
    }, []);

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

    useEffect(() => {
        const handleEntitySelection = ({ item, callerId }) => {
            if (callerId !== `${column}_browser`) {
                return;
            }
            setSelectedEntity(item.item);
            setIsBrowserDialogOpen(false);
        }
        app.on(app.entitySelected, handleEntitySelection);
        return () => {
            app.removeListener(app.entitySelected, handleEntitySelection);
        }
    });

    const browserDialog = <Dialog
        open={isBrowserDialogOpen}
        aria-labelledby="form-dialog-title"
        fullScreen
        TransitionComponent={Transition}
        onClose={() => setIsBrowserDialogOpen(false)}
    >
        <DialogTitle
            id="form-dialog-title"
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
            {clonedBrowser}
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

export { Browse };