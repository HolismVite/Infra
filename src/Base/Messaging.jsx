import app from './App';

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
        app.emit(app.showMessage, { message: message, action: action, type: type });
    }
}

export default Messaging;