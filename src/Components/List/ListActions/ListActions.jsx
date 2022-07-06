import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { ListContext } from 'Contexts'
import AddAction from './AddAction';

const ListActions = () => {
    let navigate = useNavigate();

    const { listActions, selectedEntities } = useContext(ListContext);

    let clonedListActions = null;
    let actionItems = null;

    if (typeof listActions === 'function') {
        var actionsReturn = listActions(selectedEntities);
        if (actionsReturn.props.children) {
            actionItems = actionsReturn.props.children;
        }
        else {
            actionItems = actionsReturn;
        }
    }
    else {
        if (listActions) {
            if (listActions.props.children) {
                actionItems = listActions.props.children;
            }
            else {
                actionItems = listActions;
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
            'flex flex-wrap items-center mb-2 lg:mb-0 '
        }
    >
        <AddAction />
        <div>
            {
                clonedListActions?.map((action, index) => {
                    if (action.props.minCardinality) {
                        if (selectedEntities.length >= action.props.minCardinality) {
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