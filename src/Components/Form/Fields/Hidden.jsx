import { useState, useEffect, useContext } from 'react';
import { FormContext } from 'Contexts'

const Hidden = ({
    column,
    value
}) => {

    const [id, setId] = useState();
    const { addFieldToFormContext } = useContext(FormContext);

    useEffect(() => {
        setId(`hidden_${column}`);
    }, [column]);

    useEffect(() => {
        addFieldToFormContext(id, value, true);
        // app.on(app.formSubmitted, () => { });
    }, [value, id]);

    return <input
        id={id}
        type="hidden"
        value={value}
    />
};

export default Hidden 