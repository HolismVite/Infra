const Explanations = ({ explanations }) => {
    return <div>
        {
            explanations
        }
        {
            explanations
                ?
                <div className="mb-12"></div>
                :
                null
        }
    </div>
}

export { Explanations }