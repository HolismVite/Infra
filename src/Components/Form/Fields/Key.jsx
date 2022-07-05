import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useForm } from 'Hooks'
import { FormContext } from 'Contexts'
import Text from './Text'

const Key = () => {

    const { mode, formMode } = useForm(FormContext)

    return <Text
        column='Key'
        placeholder='Key'
        hint={mode === formMode.edition && 'Please change with caution'}
        startIcon={WarningAmberIcon}
        superAdmin
    />
}

export default Key