import Holism from "./Holism"

const Env = {
    env: (key) => {
        if (!key) {
            return `UNDEFINED_KEY`
        }
        key = `REACT_APP_${key}`
        const value = process.env[key]
        if (!value) {
            console.error('Non existing key in the environment', key)
            return ''
        }
        return Holism.trim(value, '/')
    },
    isDev: () => {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            return true
        } else {
            return false
        }
    }
}

export default Env