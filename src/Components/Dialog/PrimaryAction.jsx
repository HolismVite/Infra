import Button from '@mui/material/Button';
import app from 'App'

const PrimaryAction = ({
    text,
    click,
    disabled
}) => {
    return <Button
        className={disabled && "bg-green-200 text-gray-900 border-gray-400"}
        onClick={click}
        disabled={disabled || false}
    >
        {app.t(text || 'Ok')}
    </Button>
}

export default PrimaryAction