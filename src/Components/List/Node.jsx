import { useState, useContext } from 'react'
import Collapse from '@mui/material/Collapse';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AddIcon from '@mui/icons-material/Add';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import { ListContext } from 'Contexts'
import { DialogContext } from 'Contexts'
import { EntityContext } from 'Contexts'
import HolismIcon from '../HolismIcon';
import EntityActions from './EntityActions/EntityActions';
import Unify from '../Unify';
import EntityAction from './EntityActions/EntityAction';

const Node = () => {

    const {
        create,
        edit,
        entityActions,
        entityType,
        expanded,
        hasDelete,
        hasEdit,
        reload,
        setEntity,
        show,
        upsert,
    } = useContext(ListContext)

    const {
        entity
    } = useContext(EntityContext)

    const [open, setOpen] = useState(false)
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
                    (entityActions || hasDelete || hasEdit || edit)
                        ?
                        <EntityActions
                            className="hidden absolute right-0 top-0 bottom-p m-auto group-hover:flex"
                            entityActions={(create || upsert) ? <>
                                <Unify component={entityActions} />
                                <DialogContext.Provider
                                    value={{
                                        open,
                                        setOpen,
                                        parentId: entity.hierarchyId || entity.id
                                    }}
                                >
                                    {
                                        create && typeof create !== 'string' &&
                                        <Unify
                                            component={create}
                                        />
                                    }
                                    {
                                        upsert && typeof upsert !== 'string' &&
                                        <Unify
                                            component={upsert}
                                        />
                                    }
                                    <EntityAction
                                        icon={<AddIcon />}
                                        click={() => setOpen(true)}
                                    />
                                </DialogContext.Provider>
                            </> : entityActions}
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
                    <EntityContext.Provider
                        key={entity.id}
                        value={{
                            entity: childEntity,
                        }}
                    >
                        <Node />
                    </EntityContext.Provider>
                </ul>)
            }
        </Collapse>
    </li>
}

export default Node