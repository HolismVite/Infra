import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { ItemAction } from '@List';
import { app } from '@List';
import { useNavigate } from 'react-router-dom';

const EditAction = ({
    entityType,
    item,
    hasEdit,
    create,
    edit,
    upsert,
    asMenuItem
}) => {

    const navigate = useNavigate();

    const manageEdition = (component) => {
        if (typeof component === 'function') {
            var result = component(item);
            if (typeof result === 'object') {
                app.emit(app.editRequested, {
                    entityType: entityType,
                    entity: item,
                });
            }
            else if (typeof result === 'string') {
                navigate(result);
            }
            else {
                app.error('For edition, either provide a component, or a URL');
            }
        }
        else if (typeof component === 'string') {
            navigate(component);
        }
        else {
            app.error('For edition, either provide a component, or a URL');
        }
    }

    return <>
        <ItemAction
            icon={<EditIcon style={{ color: '#10B981' }} />}
            title={app.t("Edit")}
            asMenuItem={asMenuItem}
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