import Node from './Node'
import NoItemsFound from '../NoItemsFound';

const Tree = ({
    data,
    expanded,
    show,
    ...rest
}) => {
    return data.length === 0
        ?
        <NoItemsFound />
        :
        <ul className="w-full px-6">
            {
                data.map(entity => <Node
                    key={entity.id}
                    entity={entity}
                    expanded={expanded || true}
                    show={show}
                    {...rest}
                />)
            }
        </ul>
}

export default Tree

export { Tree }