import { useState, useContext } from 'react'
import Collapse from '@mui/material/Collapse';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AddIcon from '@mui/icons-material/Add';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import { ListContext } from 'Contexts'
import { EntityContext } from 'Contexts'
import HolismIcon from '../HolismIcon';
import EntityActions from './EntityActions/EntityActions';
import Unify from '../Unify';
import EntityAction from './EntityActions/EntityAction';

const Node = () => {

    const {
        create,
        edit,
        entity,
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

    const [isExpanded, setIsExpanded] = useState(expanded)
    const [hasChildren, setHasChildren] = useState(entity.relatedItems.children.length > 0)

    return <EntityContext.Provider
        value={{
            entity: entity
        }}>
        <li className={entity.parentId && "ml-8 border-l border-dashed border-slate-400"}>
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
                                    <EntityAction
                                        icon={<AddIcon />}
                                        click={() => {
                                            // app.emit(app.creationRequested, { parentId: entity.hierarchyId || entity.id })
                                        }}
                                    />
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
                            entityActions={entityActions}
                            setEntity={setEntity}
                            reload={reload}
                        />
                    </ul>)
                }
            </Collapse>
        </li>
    </EntityContext.Provider>
}

export default Node