const TimePart = ({ value }) => {
    const normalizedValue = (value && value.endsWith('Z')) ? value : (value + 'Z');
    return value ? <span>
        {
            new Date(normalizedValue).toLocaleTimeString()
        }
    </span> : null;
}

export { TimePart }