import React from 'react';

const useLocalStorageState = (defaultValue, key) => {
    const [value, setValue] = React.useState(() => {
        const stickyValue = window.localStorage.getItem(key);
        return (stickyValue !== null && stickyValue !== 'undefined')
            ? JSON.parse(stickyValue)
            : defaultValue;
    });
    React.useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}

export default useLocalStorageState;
export { useLocalStorageState };