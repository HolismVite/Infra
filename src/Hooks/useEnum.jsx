import { useEffect, useState } from 'react'
import app from 'App'
import { get } from 'App'

const useEnum = ({
    entityType
}) => {

    app.ensure([entityType])

    const [progress, setProgress] = useState()
    const [enumItems, setEnumItems] = useState(app.getEnum(entityType) || [])

    useEffect(() => {
        if (enumItems.length !== 0) {
            return
        }
        setProgress(true)
        get(`/${app.camelize(entityType)}/all`).then(data => {
            setEnumItems(data)
            app.setEnum(entityType, data)
            window.enums = app.getEnums()
            setProgress(false)
        }, error => {
            console.log(error)
            setProgress(false)
        })
    }, [enumItems.length, setEnumItems, entityType])

    return {
        enumItems,
        progress,
        setEnumItems,
        setProgress,
    }
}

export default useEnum