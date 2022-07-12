import React from 'react';
import { useLocalStorageState } from 'Hooks'
import app from 'App'
import List from './List';

const Tree = ({
    expanded,
    show,
    entityType,
    ...props
}) => {

    const [isExpanded, setIsExpanded] = useLocalStorageState(expanded || true, `${app.camelize(entityType)}_isTreeExpanded`);

    return <List
        {...props}
        entityType={entityType}
        isTree={true}
        expanded={isExpanded}
        show={show}
    />
}

export default Tree 