const originalStorage = {}
const transformedStorage = {}

const Enums = {
    setEnum: (entityType, items) => {
        const key = app.camelize(entityType)
        originalStorage[key] = items
        transformedStorage[key] = {}
        items.map(item => {
            transformedStorage[key][app.camelize(item.key)] = item.id
        })
    },
    getEnum: (entityType) => {
        const key = app.camelize(entityType)
        return originalStorage[key]
    },
    getEnums: () => {
        return transformedStorage
    }
}

export default Enums