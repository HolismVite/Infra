import React from 'react';
import useLocalStorageState from '../../Base/UseLocalStorageState';
import { List } from './List'
import { app } from './Exports';

const Tree = ({
    expanded,
    show,
    entityType,
    ...props
}) => {

    const [isExpanded, setIsExpanded] = useLocalStorageState(expanded || true, `${app.userGuid()}_${entityType}_isTreeExpanded`);

    return <List
        {...props}
        entityType={entityType}
        isTree={true}
        expanded={isExpanded}
        show={show}
    />
}

export { Tree }