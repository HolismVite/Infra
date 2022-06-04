import Button from '@mui/material/Button';
import app from '../../Base/App';

const PrimaryAction = ({
    text,
    click,
    disabled
}) => {
    return <Button
        variant="outlined"
        className={'ml-2' + (typeof disabled !== 'undefined' && !disabled ? " bg-green-200 text-gray-900 border-gray-400 " : "")}
        onClick={(e) => click && typeof click === 'function' ? click() : null}
        disabled={typeof disabled !== 'undefined' ? disabled : false}
    >
        {app.t(text || 'Ok')}
    </Button>
}

export { PrimaryAction }