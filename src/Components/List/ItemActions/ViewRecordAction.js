import React, { useState } from 'react';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { Dialog, ItemAction } from '@List';
import { app } from '@List';

const ViewRecordAction = ({
    entityType,
    item,
    asMenuItem
}) => {

    const [open, setOpen] = useState(false)

    const getJsonHtml = (obj, level) => {
        if (!obj) {
            return <span className="ml-2 ml-4 ml-6 ml-8 ml-10"></span>
        }
        return <ul className="leading-4">
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
                                        typeof property === "string"
                                            ?
                                            `"${obj[propertyName]}"`
                                            :
                                            obj[propertyName]
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

    const dialog = <Dialog
        title='View record'
        content={getJsonHtml(item, 1)}
        isOpen={open}
        onClosed={() => setOpen(false)}
    />

    return <>
        {dialog}
        <ItemAction
            icon={<DataObjectIcon style={{ color: 'rgb(37 99 235)' }} />}
            asMenuItem={asMenuItem}
            title={app.t("View record")}
            click={() => setOpen(!open)}
        />
    </>
}

export default ViewRecordAction;