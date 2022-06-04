import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { app, ListContext, HolismIcon } from '@List';

const ListActions = ({ actions, create, creationButton, upsert }) => {
    let navigate = useNavigate();

    const { selectedItems } = useContext(ListContext);

    let clonedListActions = null;
    let actionItems = null;

    if (typeof actions === 'function') {
        var actionsReturn = actions(selectedItems);
        if (actionsReturn.props.children) {
            actionItems = actionsReturn.props.children;
        }
        else {
            actionItems = actionsReturn;
        }
    }
    else {
        if (actions) {
            if (actions.props.children) {
                actionItems = actions.props.children;
            }
            else {
                actionItems = actions;
            }
        }
    }

    if (actionItems) {
        clonedListActions =
            React
                .Children
                .toArray(actionItems)
                .map(listAction => React.cloneElement(listAction, {

                }))
    }

    return <div
        id='listActions'
        className=
        {
            'flex flex-wrap items-center'
            + (app.isRtl() ? " flex-row-reverse " : "")
        }
    >
        <div>
            {
                create || upsert    
                    ?
                    <Button
                        className="bg-green-200 text-gray-900 border-gray-400 hover:bg-green-400 mt-2 lg:mt-0 mr-2"
                        variant="outlined"
                        startIcon={
                            (creationButton && creationButton.icon)
                                ?
                                <HolismIcon icon={creationButton.icon} />
                                :
                                <AddIcon />
                        }
                        onClick={() => {
                            if (typeof create === 'string') {
                                navigate(create)
                            }
                            else {
                                app.emit(app.creationRequested)
                            }
                        }}
                    >
                        {
                            (creationButton && creationButton.text)
                                ?
                                app.t(creationButton.text)
                                :
                                app.t("Create")
                        }
                    </Button>
                    :
                    null
            }
        </div>
        <div>
            {
                clonedListActions?.map((action, index) => {
                    if (action.props.minCardinality) {
                        if (selectedItems.length >= action.props.minCardinality) {
                            return <span key={index}>
                                {
                                    action
                                }
                            </span>
                        }
                        return <span key={index}>
                            {
                                action
                            }
                        </span>
                    }
                    else {
                        return <span key={index}>
                            {
                                action
                            }
                        </span>
                    }
                })
            }
        </div>
    </div>
}

export default ListActions;