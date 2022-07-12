import React, { useContext, useState, useEffect } from 'react'
import app from 'App'
import { filterOperator } from 'App'
import { ListContext } from 'Contexts'

const useFilter = ({
    choose,
    column,
    operator,
    placeholder,
    show,
    type,
}) => {

    app.ensure([column, choose, type])

    const [id, setId] = useState()
    const [entity, setEntity] = useState(null)
    const [shown, setShown] = useState('')
    const [chosen, setChosen] = useState('')

    var {
        setFilter
    } = useContext(ListContext)
    const label = placeholder || column

    // todo: on resetting filters => setEntity(entity || "")

    useEffect(() => {
        setId(`${type}_${column}`)
    }, [type, column])

    useEffect(() => {
        setFilter(column, chosen, operator || filterOperator.contains)
    }, [column, chosen])

    useEffect(() => {
        if (entity) {
            setShown(show(entity))
            setChosen(choose(entity))
        }
        else {
            setShown('')
            setChosen('')
        }
    }, [entity])

    return {
        chosen,
        entity,
        id,
        label,
        setChosen,
        setEntity,
        setShown,
        shown,
    }
}

export default useFilter