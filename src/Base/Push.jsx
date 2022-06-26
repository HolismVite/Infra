const Push = {
    configPusher: () => {
        if (!import.meta.env.VITE_PUSHER_KEY) {
            return;
        }
        try {
            if (!import.meta.env.NODE_ENV || import.meta.env.NODE_ENV === 'development') {
                window.Pusher.logToConsole = true;
            } else {

            }

            var pusher = new window.Pusher(import.meta.env.VITE_PUSHER_KEY, {
                cluster: import.meta.env.VITE_PUSHER_CLUSTER
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