import React, { useContext } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { EntityAction } from '@List';
import { app } from '@List';
import { useNavigate } from 'react-router-dom';
import { ListContext } from '../Contexts'
import { EntityContext } from '../Contexts';

const EditAction = () => {

    const navigate = useNavigate();
    const {
        create,
        edit,
        entityType,
        hasEdit,
        menuForActions,
        showDialog,
        upsert,
    } = useContext(ListContext)
    const { entity } = useContext(EntityContext)

    const manageEdition = (component) => {
        if (typeof component === 'string') {
            navigate(component);
        }
        else {
            if (typeof component === 'function') {
                var result = component(entity);
                if (typeof result === 'object') {
                    showDialog({
                        purpose: 'edition',
                        entity,
                        entityType
                    })
                }
                else if (typeof result === 'string') {
                    navigate(result);
                }
                else {
                    app.error('For edition, either provide a component, or a URL');
                }
            }
            else {
                showDialog({
                    purpose: 'edition',
                    entity,
                    entityType
                })
            }
        }
    }

    return <>
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
    </>
}

export default EditAction;