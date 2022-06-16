import app from '../Base/App'
import React, { useState, useEffect, useContext } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import useMessage from '../Hooks/useMessage'
import { PanelContext } from './Contexts'

const Alert = React.forwardRef((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const Message = () => {

    const { hide } = useMessage()

    const {
        isMessageShown,
        severity,
        message
    } = useContext(PanelContext)

    const hideMessage = (e, reason) => {
        if (reason === 'clickaway') {
            return
        }
        hide()
    }

    return <Snackbar
        open={isMessageShown}
        autoHideDuration={6000}
        onClose={hideMessage}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        ContentProps={{
            style: { whiteSpace: 'pre-line' }
        }}
        bodystyle={{ whiteSpace: 'pre-line' }}
    >
        <Alert onClose={hideMessage} severity={severity || 'success'} sx={{ width: '100%' }}>
            {app.t(message)}
        </Alert>
    </Snackbar>
}

export default Message