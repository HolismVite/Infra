import React from "react";
import Integer from "./Integer";

const PositiveInteger = (props) => {

    return <Integer
        {...props}
        acceptOnly={(value) => value > 0}
    />;
};

export default PositiveInteger;