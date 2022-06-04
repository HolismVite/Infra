const DatePart = ({ value }) => {
    const normalizedValue = (value && value.endsWith('Z')) ? value : (value + 'Z');
    return value ? <span>
        {
            new Date(normalizedValue).toDateString()
        }
    </span> : null;
}

export { DatePart }