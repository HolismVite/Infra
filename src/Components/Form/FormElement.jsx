import { useContext } from 'react'
import { FormContext } from 'Contexts'
import Unify from "../Unify"
import Progress from '../Progress'

const FormElement = ({
    id,
    inputs,
    handleSubmit
}) => {

    const { externalProgress } = useContext(FormContext)

    return <form
        id={id || 'form'}
        noValidate
        onSubmit={handleSubmit}
    >
        <div id='fields' className={externalProgress && 'grid place-items-center'}>
            {
                externalProgress
                    ?
                    <div className="py-10">
                        <Progress />
                    </div>
                    :
                    <Unify
                        component={inputs}
                    />
            }
        </div>
    </form>
}

export default FormElement 