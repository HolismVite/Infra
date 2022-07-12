import React, { useContext, useState, useEffect } from 'react'
import app from 'App'
import { filterOperator } from 'App'
import { ListContext } from 'Contexts'

const useFilter = ({
    column,
    operator,
    placeholder,
    type,
}) => {

    app.ensure(column)

    const [id, setId] = useState()
    const [entity, setEntity] = useState()

    var {
        setFilter
    } = useContext(ListContext)
    const label = placeholder || column

    // todo: on resetting filters => setEntity(entity || "")

    useEffect(() => {
        setId(`${type}_${column}`)
    }, [type, column])

    useEffect(() => {
        setFilter(column, entity, operator || filterOperator.contains)
    }, [column, setFilter, operator, entity])

    return {
        entity,
        label,
        setEntity,
    }
}

export default useFilter