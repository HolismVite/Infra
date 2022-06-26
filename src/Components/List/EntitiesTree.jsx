import Node from './Node'
import NoEntitiesFound from '../NoEntitiesFound';

const Tree = ({
    data,
    expanded,
    show,
    ...rest
}) => {
    return data.length === 0
        ?
        <NoEntitiesFound />
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
