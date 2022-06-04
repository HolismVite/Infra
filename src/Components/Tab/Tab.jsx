import MuiTab from '@mui/material/Tab';

const Tab = ({ title, icon, panel }) => {
    const Icon = icon;
    console.log(title, icon)
    return <MuiTab
        label={title}
        icon={icon ? <Icon /> : null}
    />
}

export default Tab
export { Tab }