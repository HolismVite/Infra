import EventManager from './EventManager';

const Messaging = {
    success: (message, action) => {
        Messaging.message(message, action, 'success');
    },
    info: (message, action) => {
        Messaging.message(message, action, 'info');
    },
    warning: (message, action) => {
        Messaging.message(message, action, 'warning');
    },
    error: (message, action) => {
        Messaging.message(message, action, 'error');
    },
    message: (message, action, type) => {
        if (message && message.message) {
            message = message.message;
        }
        EventManager.emit(EventManager.showMessage, { message: message, action: action, type: type });
    }
}

export default Messaging;