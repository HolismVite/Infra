import { useState } from 'react'
import Collapse from '@mui/material/Collapse';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AddIcon from '@mui/icons-material/Add';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import BlockIcon from '@mui/icons-material/Block';
import RemoveIcon from '@mui/icons-material/Remove';
import { HolismIcon, app } from '@Panel'
import EditAction from './ItemActions/EditAction';
import ItemActions from './ItemActions/ItemActions';
import { ItemAction } from './ItemActions/ItemAction';
import Unify from '../Unify';

const Node = ({
    entityType,
    entity,
    show,
    expanded,
    hasEdit,
    hasDelete,
    create,
    edit,
    upsert,
    itemActions,
    setItem,
    reload
}) => {
    const [isExpanded, setIsExpanded] = useState(expanded)
    const [hasChildren, setHasChildren] = useState(entity.relatedItems.children.length > 0)

    return <li className={entity.parentId && "ml-8 border-l border-dashed border-slate-400"}>
        <span
            className="group relative hover:bg-slate-100 px-5 py-2 inline-block cursor-pointer flex items-center"
            onClick={(e) => {
                setIsExpanded(!isExpanded)
            }}
        >
            {
                hasChildren
                    ?
                    isExpanded
                        ?
                        <HolismIcon
                            className="text-slate-500"
                            icon={IndeterminateCheckBoxOutlinedIcon}
                        />
                        :
                        <HolismIcon
                            className="text-slate-500"
                            icon={AddBoxOutlinedIcon}
                        />
                    :
                    <HolismIcon
                        className="text-slate-300"
                        icon={RemoveIcon}
                    />
            }
            <span className="flex justify-between w-full items-center">
                <span className="ml-1 text-sm font-normal text-slate-900">
                    {
                        (show && typeof show === 'function')
                            ? show(entity)
                            :
                            'Either show function is not provided, or it is not a function'
                    }
                </span>
                {
                    (itemActions || hasDelete || hasEdit || edit)
                        ?
                        <ItemActions
                            className="hidden absolute right-0 top-0 bottom-p m-auto group-hover:flex"
                            entityType={entityType}
                            item={entity}
                            itemActions={(create || upsert) ? <>
                                <Unify component={itemActions} />
                                <ItemAction
                                    icon={<AddIcon />}
                                    click={() => {
                                        app.emit(app.creationRequested, { parentId: entity.hierarchyId || entity.id })
                                    }}
                                />
                            </> : itemActions}
                            hasDelete={hasDelete}
                            hasEdit={hasEdit}
                            edit={edit}
                            create={create}
                            upsert={upsert}
                            setItem={setItem}
                            reload={reload}
                        />
                        :
                        null
                }
            </span>
        </span>
        <Collapse in={isExpanded}>
            {
                entity.relatedItems.children.map(childEntity => <ul
                    key={childEntity.id}
                >
                    <Node
                        show={show}
                        expanded={isExpanded}
                        entity={childEntity}
                        entityType={entityType}
                        hasEdit={hasEdit}
                        hasDelete={hasDelete}
                        create={create}
                        edit={edit}
                        upsert={upsert}
                        itemActions={itemActions}
                        setItem={setItem}
                        reload={reload}
                    />
                </ul>)
            }
        </Collapse>
    </li>
}

export default Node