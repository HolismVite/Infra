import app from '../Base/App';
import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import MuiAlert from '@material-ui/lab/Alert';

// function Alert(props) {
//     return <MuiAlert elevation={6} variant="filled" {...props} />;
// }
// https://mui.com/components/snackbars/#customization

const Message = () => {
    const [isShown, setIsShown] = useState();
    const [message, setMessage] = useState();
    const [action, setAction] = useState();
    const [type, setType] = useState();
    const [id, setId] = useState(app.randomId());
    const [classes, setClasses] = useState('');

    useEffect(() => {
        const show = ({ message, action, type }) => {
            setMessage(message);
            setAction(action);
            setType(type);
        }
        app.on(app.showMessage, show);
        return () => {
            app.removeListener(app.showMessage, show);
        };
    }, []);

    useEffect(() => {
        if (message) {
            setId(app.randomId());
            setIsShown(true);
        }
    }, [message]);

    useEffect(() => {
        if (type === 'success') {
            setClasses('bg-green-400 text-white');
        }
        else if (type === 'info') {
            setClasses('bg-blue-400 text-white');
        }
        else if (type === 'warning') {
            setClasses('bg-yellow-400 text-gray-900');
        }
        else if (type === 'error') {
            setClasses('bg-red-400 text-white-900');
        }
        else {
            setClasses(null);
        }
    }, [type]);

    const hide = () => {
        setMessage(null);
        setIsShown(false);
    }

    return <Snackbar
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        key={id}
        type={type}
        className={classes + ' rounded-md'}
        ContentProps={{
            className: classes,
            style: { whiteSpace: 'pre-line' }
        }}
        open={isShown}
        autoHideDuration={6000}
        onClose={hide}
        message={message}
        bodystyle={{ whiteSpace: 'pre-line' }}
        action={
            <>
                {
                    action
                        ?
                        action
                        :
                        null
                }
                <IconButton size="small" aria-label="close" color="inherit" onClick={hide}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </>
        }
    />
}

export default Message;