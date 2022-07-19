import React, { useState, useContext } from 'react';
import DataObjectIcon from '@mui/icons-material/DataObject';
import app from 'App'
import { ListContext } from 'Contexts'
import { EntityContext } from 'Contexts'
import { DialogContext } from 'Contexts'
import Dialog from '../../Dialog/Dialog';
import EntityAction from './EntityAction';

const ViewRecordAction = () => {

    const [open, setOpen] = useState(false)
    const { menuForActions } = useContext(ListContext)
    const { entity } = useContext(EntityContext)

    const getJsonHtml = (obj, level) => {
        if (!obj) {
            return <span className="ml-2 ml-4 ml-6 ml-8 ml-10"></span>
        }
        return <ul className="leading-4" dir='ltr'>
            <li className={"text-orange-600 ml" + level * 2}>{'{'}</li>
            {
                Object.getOwnPropertyNames(obj).map(propertyName => {
                    const property = obj[propertyName]
                    return <li key={propertyName}>
                        <span className="font-bold text-purple-900 font-mono px-2 ml-8 inline-block rounded">{propertyName}:</span>
                        {
                            typeof property === 'object' && property != null
                                ?
                                <span className="ml-10 block">
                                    {getJsonHtml(property, level + 1)}
                                </span>
                                :
                                <span className="inline-block ml-1">
                                    {
                                        obj[propertyName] === null
                                            ?
                                            <span className="text-gray-400">null</span>
                                            :
                                            (
                                                typeof property === "string"
                                                    ?
                                                    `"${obj[propertyName]}"`
                                                    :
                                                    (
                                                        typeof property === 'boolean'
                                                            ?
                                                            (
                                                                obj[propertyName] === true ? 'true' : 'false'
                                                            )
                                                            :
                                                            obj[propertyName]
                                                    )
                                            )
                                    }
                                </span>
                        }
                    </li>
                })
            }
            <li className="text-orange-600">{'}'}</li>
        </ul>
    }

    const nestedItem = {
        first: 'first',
        second: {
            first: 'first',
            second: {
                first: 'first',
                second: {
                    first: 'first'
                }
            }
        }
    }

    const dialog = <DialogContext.Provider
        value={{
            open,
            setOpen
        }}
    >
        <Dialog
            title='View record'
            content={getJsonHtml(entity, 1)}
            onClosed={() => setOpen(false)}
        />
    </DialogContext.Provider>

    return <>
        {dialog}
        <EntityAction
            icon={<DataObjectIcon style={{ color: 'rgb(37 99 235)' }} />}
            asMenuItem={menuForActions}
            title={app.t("View record")}
            click={() => setOpen(!open)}
        />
    </>
}

export default ViewRecordAction;