import { useContext } from 'react'
import { FormContext } from 'Contexts'
import Collapse from '@mui/material/Collapse'
import Unify from "../Unify"
import Progress from '../Progress'

const FormElement = ({
    id,
    inputs,
    handleSubmit
}) => {

    const {
        contentProgress,
        externalProgress,
    } = useContext(FormContext)

    return <form
        id={id || 'form'}
        noValidate
        onSubmit={handleSubmit}
    >
        <div id='fields' className={(externalProgress || contentProgress) && 'grid place-items-center'}>
            <Collapse in={externalProgress || contentProgress}>
                <div className="py-10">
                    <Progress />
                </div>
            </Collapse>
            <Collapse in={!externalProgress && !contentProgress}>
                <Unify
                    component={inputs}
                />
            </Collapse>
        </div>
    </form>
}

export default FormElement 