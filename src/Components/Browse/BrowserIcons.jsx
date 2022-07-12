import { useContext } from 'react'
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Tooltip from '@mui/material/Tooltip';
import ClearIcon from '@mui/icons-material/Clear';
import { BrowseContext } from 'Contexts'
import { DialogContext } from 'Contexts'

const BrowserIcons = ({ onCleared }) => {

    const { setOpen } = useContext(DialogContext)

    const {
        progress,
        selectedEntity,
        setSelectedEntity,
    } = useContext(BrowseContext)

    return <InputAdornment
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
                        size='small'
                        onClick={() => {
                            setSelectedEntity(null)
                            if (onCleared instanceof Function) {
                                onCleared()
                            }
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
                size='small'
                onClick={() => setOpen(true)}
                onMouseDown={() => { }}
            >
                <MoreHorizIcon />
            </IconButton>
        </Tooltip>
    </InputAdornment>
}

export default BrowserIcons