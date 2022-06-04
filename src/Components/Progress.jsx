import CircularProgress from '@mui/material/CircularProgress';

const Progress = ({ size }) => {
    return size
        ?
        <CircularProgress
            size={size}
        />
        :
        <CircularProgress />
}

export { Progress }