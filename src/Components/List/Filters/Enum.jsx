import React, { useEffect, useState } from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'
import app from 'App'
import { get } from 'App'
import Filter from './Filter'
import filterOperator from '../../../Base/FilterOperator'

const Enum = ({ column, entityType, placeholder }) => {

    app.ensure([column, placeholder, entityType])

    const [loading, setLoading] = useState()
    const [enumItems, setEnumItems] = useState(app.getEnum(entityType) || [])

    useEffect(() => {
        if (enumItems.length !== 0) {
            return
        }
        setLoading(true)
        get(`/${entityType}/all`).then(data => {
            setEnumItems(data)
            app.setEnum(entityType, data)
            window.enums = app.getEnums()
            setLoading(false)
        }, error => {
            console.log(error)
            setLoading(false)
        })
    }, [enumItems.length, setEnumItems, entityType])

    return <Filter
        type='select'
        column={column}
        placeholder={placeholder}
        operator={filterOperator.equals}
        renderInput={(value, setValue, label) =>
            <Select
                size='small'
                value={value}
                label={app.t(label)}
                fullWidth
                onChange={(event) => { setValue(event.target.value) }}
            >
                {
                    loading
                        ?
                        <CircularProgress />
                        :
                        (
                            enumItems
                                ?
                                enumItems.map(item => <MenuItem key={item.id} value={item.id}>{app.t(item.titleizedKey)}</MenuItem>)
                                :
                                null
                        )
                }
            </Select>}
    />
}

export default Enum 