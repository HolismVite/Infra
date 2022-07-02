import { post } from '../../Base/Api'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import HeaderAction from "./HeaderAction"

const ClearCache = () => {

    return <HeaderAction
        title="Clear Cache"
        icon={DeleteSweepIcon}
        action={({ setProgress, success, error }) => {
            setProgress(true)
            post('/cache/clear')
                .then(data => {
                    success('Cache cleared')
                    setProgress(false)
                }, e => {
                    error(e)
                    setProgress(false)
                })
        }}
    />
}

export default ClearCache 