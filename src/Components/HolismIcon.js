import Icon from '@mui/material/Icon';

const HolismIcon = ({ icon, className }) => {
    const styles = className ?? "";
    switch (typeof icon) {
        case 'object':
            const iconType = typeof icon?.type;
            if (
                iconType === 'function'
                || (iconType === 'object' && typeof icon.type?.render ===
                    'function')) {
                const PassedIcon = icon
                return <PassedIcon className={styles} />;
            }
            if (icon.props) {
                return icon;
            }
            return <>{icon}</>;
        case 'function':
            return icon()
        case 'string':
            if (icon.indexOf('svg') > -1) {
                return <span className={styles}>{icon}</span>;
            }
            return <Icon className={styles}>{icon}</Icon>;
        default:
            return <span className={styles}>Iconless</span>;
    }
}

export default HolismIcon;
export { HolismIcon };