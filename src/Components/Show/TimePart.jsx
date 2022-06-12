const TimePart = ({ value, className }) => {
    const normalizedValue = (value && value.endsWith('Z')) ? value : (value + 'Z');
    return value ? <span
        dir="ltr"
        className={className || ""}
    >
        {
            new Date(normalizedValue).toLocaleTimeString()
        }
    </span> : null;
}

export { TimePart }