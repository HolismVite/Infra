import app from '../Base/App'
import React, { useState, useEffect } from 'react'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const Message = () => {
    const [isShown, setIsShown] = useState()
    const [message, setMessage] = useState()
    const [action, setAction] = useState()
    const [type, setType] = useState()
    const [classes, setClasses] = useState('')
    const [severity, setSeverity] = useState('')

    useEffect(() => {
        const show = ({ message, action, type }) => {
            setMessage(message)
            setAction(action)
            setType(type)
        }
        app.on(app.showMessage, show)
        return () => {
            app.removeListener(app.showMessage, show)
        }
    }, [])

    useEffect(() => {
        if (message) {
            setIsShown(true)
        }
    }, [message])

    useEffect(() => {
        if (type === 'success') {
            setClasses('bg-green-400 text-white')
            setSeverity('success')
        }
        else if (type === 'info') {
            setClasses('bg-blue-400 text-white')
            setSeverity('info')
        }
        else if (type === 'warning') {
            setClasses('bg-yellow-400 text-gray-900')
            setSeverity('warning')
        }
        else if (type === 'error') {
            setClasses('bg-red-400 text-white-900')
            setSeverity('danger')
        }
        else {
            setClasses(null)
            setSeverity('')
        }
    }, [type])

    const hide = (e, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setIsShown(false)
    }

    useEffect(() => {
        if (isShown === false) {
            setTimeout(() => {
                setMessage(null)
                setSeverity(null)
            }, 100)
        }
    }, [isShown])

    return <Snackbar
        open={isShown}
        autoHideDuration={6000}
        onClose={hide}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        ContentProps={{
            className: classes,
            style: { whiteSpace: 'pre-line' }
        }}
        bodystyle={{ whiteSpace: 'pre-line' }}
    >
        <Alert onClose={hide} severity={'success'} sx={{ width: '100%' }}>
            {app.t(message)}
        </Alert>
    </Snackbar>
}

export default Message