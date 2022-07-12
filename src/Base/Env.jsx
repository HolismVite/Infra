import Holism from "./Holism"

const Env = {
    env: (key) => {
        if (!key) {
            return `UNDEFINED_KEY`
        }
        key = `VITE_${key}`
        const value = import.meta.env[key]
        if (!value) {
            console.error('Non existing key in the environment', key)
            return ''
        }
        return Holism.trim(value, '/')
    },
    isDev: () => {
        if (import.meta.env.PROD) {
            return false
        } else {
            return true
        }
    }
}

export default Env