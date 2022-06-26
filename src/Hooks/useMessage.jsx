import { useContext } from 'react'
import PanelContext from '../Panel/PanelContext'

const useMessage = () => {

    const {
        setIsMessageShown,
        setMessage,
        setAction,
        setSeverity
    } = useContext(PanelContext)

    const show = (data, action, type) => {
        if (data && data.message) {
            data = data.message;
        }
        setMessage(data)
        setAction(action)
        setSeverity(type)
        setIsMessageShown(true)
    }

    const success = (data, action) => {
        show(data, action, 'success')
    }

    const info = (data, action) => {
        show(data, action, 'info')
    }

    const warning = (data, action) => {
        show(data, action, 'warning')
    }

    const error = (data, action) => {
        show(data, action, 'error')
    }

    const hide = () => {
        setIsMessageShown(false)
    }

    return {
        success,
        info,
        warning,
        error,
        show,
        hide
    }
}

export default useMessage