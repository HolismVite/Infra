const Push = {
    configPusher: () => {
        if (!process.env.REACT_APP_PUSHER_KEY) {
            return;
        }
        try {
            if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                window.Pusher.logToConsole = true;
            } else {

            }

            var pusher = new window.Pusher(process.env.REACT_APP_PUSHER_KEY, {
                cluster: process.env.REACT_APP_PUSHER_CLUSTER
            });
            window.pusher = pusher;
        }
        catch (error) {
            console.error(error);
        }
    },
    subscribe: (channel) => {
        return window.pusher.subscribe(channel);
    },
    unsubscribe: (channel) => {
        return window.pusher.unsubscribe(channel);
    }
}

export default Push;
export { Push };