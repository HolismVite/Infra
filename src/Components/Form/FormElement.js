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
            {inputs}
        </div>
    </form>
}

export { FormElement }