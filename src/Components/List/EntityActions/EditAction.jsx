import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import app from 'App'
import EntityAction from './EntityAction';
import { ListContext } from 'Contexts'
import { EntityContext } from 'Contexts'
import { DialogContext } from 'Contexts'
import Unify from '../../Unify';

const EditAction = () => {

    const [open, setOpen] = useState(false)

    const navigate = useNavigate();
    const {
        create,
        edit,
        entityType,
        hasEdit,
        menuForActions,
        upsert,
    } = useContext(ListContext)
    const { entity } = useContext(EntityContext)

    const hasHooks = (component) => {
        if (!component) {
            return false
        }
        if (component.toString instanceof Function) {
            return /\buse[A-Z]/.test(component.toString())
        }
        return false
    }

    const manageEdition = (component) => {
        if (typeof component === 'string') {
            navigate(component);
        }
        else {
            if (typeof component === 'function') {
                if (hasHooks(component)) {
                    setOpen(true)
                }
                else {
                    var result = component(entity);
                    if (typeof result === 'object') {
                        setOpen(true)
                    }
                    else if (typeof result === 'string') {
                        navigate(result);
                    }
                    else {
                        app.error('For edition, either provide a component, or a URL');
                    }
                }
            }
            else {
                setOpen(true)
            }
        }
    }

    return <DialogContext.Provider
        value={{
            open,
            setOpen,
            entity,
        }}
    >
        {
            create && typeof create !== 'string' &&
            <Unify
                component={create}
                isSuperAdmin={app.isSuperAdmin()}
                entityId={entity.id}
                entity={entity}
                isEdit
            />
        }
        {
            upsert && typeof upsert !== 'string' &&
            <Unify
                component={upsert}
                isSuperAdmin={app.isSuperAdmin()}
                entityId={entity.id}
                entity={entity}
                isEdit
            />
        }
        {
            edit && typeof edit !== 'string' &&
            <Unify
                component={edit}
                isSuperAdmin={app.isSuperAdmin()}
                entityId={entity.id}
                entity={entity}
                isEdit
            />
        }
        <EntityAction
            icon={<EditIcon style={{ color: '#10B981' }} />}
            title={app.t("Edit")}
            asMenuItem={menuForActions}
            click={() => {
                if (edit) {
                    manageEdition(edit);
                }
                else if (upsert) {
                    manageEdition(upsert);
                }
                else if (hasEdit) {
                    if (create) {
                        manageEdition(create);
                    }
                    else {
                        app.error('You specified hasEdit={true} but has not provided a creation component.');
                    }
                }
            }}
        />
    </DialogContext.Provider>
}

export default EditAction