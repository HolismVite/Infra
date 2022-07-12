import { useContext } from 'react'
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Tooltip from '@mui/material/Tooltip';
import ClearIcon from '@mui/icons-material/Clear';
import { DialogContext } from 'Contexts'

const BrowserIcons = ({
    progress,
    selectedEntity,
}) => {

    const {setOpen} = useContext(DialogContext)
    
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
                        aria-label={app.t("Clear")}
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
                aria-label={app.t("Find")}
                onClick={() => setOpen(true)}
                onMouseDown={() => { }}
            >
                <MoreHorizIcon />
            </IconButton>
        </Tooltip>
    </InputAdornment>
}

export default BrowserIcons