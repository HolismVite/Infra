import { useState, useEffect, useContext } from 'react'
import { PanelContext } from '../Panel/Contexts'

const useMessage = () => {

    const {
        isMessageShown,
        setIsMessageShown,
        message,
        setMessage,
        setAction,
        severity,
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

    useEffect(() => {
        if (message && severity) {
            setIsMessageShown(true)
        }
    }, [message, severity])

    useEffect(() => {
        return () => {
            if (isMessageShown === false) {
                setMessage(null)
                setSeverity(null)
            }
        }
    }, [isMessageShown])

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
export { useMessage }