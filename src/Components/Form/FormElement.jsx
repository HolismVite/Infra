import Unify from "../Unify"

const FormElement = ({
    id,
    inputs,
    handleSubmit
}) => {
    return <form
        id={id || 'form'}
        noValidate
        onSubmit={handleSubmit}
    >
        <div id='fields'>
            <Unify
                component={inputs}
            />
        </div>
    </form>
}

export default FormElement 