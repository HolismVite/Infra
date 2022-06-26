import Button from '@mui/material/Button';
import app from 'App'

const CancelAction = ({
    text,
    click
}) => {
    return <Button
        tabIndex={-1}
        className="text-gray-900 border-gray-400 "
        onClick={() => click && typeof click === 'function' ? click() : null}
    >
        {app.t(text || 'Cancel')}
    </Button>
}

export default CancelAction