
const Panel = ({ value, index, children }) => {

    return value === index
        ?
        <div>
            {
                children
            }
        </div >
        :
        null
}

export default Panel
export { Panel }