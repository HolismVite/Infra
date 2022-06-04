import TextField from "@mui/material/TextField";
import React, { useState } from "react";

const Integer = ({ onEnter, acceptOnly }) => {
    const [value, setValue] = useState("");

    const handleChange = (e) => {
        var newValue = e.target.value;
        if (newValue.indexOf('.') > -1) {
            return;
        }
        var normalizedNewValue = newValue.replace(',', '');
        if (isNaN(normalizedNewValue * 1)) {
            return;
        }
        if (Number(normalizedNewValue) === 0) {
            setValue("");
            return;
        }
        if (acceptOnly && typeof acceptOnly === 'function') {
            if (acceptOnly(normalizedNewValue)) {
                setValue(newValue.toLocaleString(0));
            }
            return;
        }
        else {
            setValue(newValue.toLocaleString(0));
        }
    };

    const handleKeyPress = (e) => {
        if (e.charCode === 13) {
            if (onEnter && typeof onEnter === 'function') {
                onEnter(value);
            }
        }
    }

    return <TextField
        id='goToPageInput'
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
    />;
};

export default Integer;