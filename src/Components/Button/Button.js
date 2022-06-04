import MuiButton from '@mui/material/Button';
import { HolismIcon } from '@Panel'

const Button = ({
    text,
    title,
    icon,
    className,
    disabled,
    click,
    color,
    progress,
    small
}) => {
    if (icon && !text) {
        return <IconButton
            color={color || "primary"}
            aria-label={title}
            component="span"
            className={className}
            disabled={disabled}
        >
            <HolismIcon
                icon={icon}
            />
        </IconButton>
    }
    return <MuiButton
        startIcon={icon}
        variant='outlined'
        disabled={disabled}
        onClick={click}
        color={color}
        className={className}
        size={small && "small"}
    >
        {text}
    </MuiButton>
}

export { Button }