import React, { useState, useEffect } from 'react';

const useBrowser = ({
    show,
    choose,
    column,
}) => {

    app.ensureFunction([show])
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [shownValue, setShownValue] = useState('')
    const [chosenValue, setChosenValue] = useState('')

    useEffect(() => {
        if (!selectedEntity) {
            setShownValue('')
            setChosenValue('')
            return;
        }
        if (typeof show(selectedEntity) === "undefined") {
            throw new Error(`No return is specified for ${column} browser show function`)
        }
        else {
            if (choose instanceof Function) {
                try {
                    let temp = choose(selectedEntity);
                    if (typeof temp === "undefined" || typeof temp === "function")
                        throw new Error(`No return value specified for ${column} browser chooser function`)
                    setChosenValue(temp);
                } catch (error) {
                    throw new Error(`No return value specified for ${column} browser chooser function`);
                }
            }
            else if (column.endsWith('Guid')) {
                setChosenValue(selectedEntity.guid);
            }
            else if (column.endsWith('Id')) {
                setChosenValue(selectedEntity.id);
            }
            else {
                throw new Error(`No return value specified for ${column} browser chooser function`);
            }
            setShownValue(show(selectedEntity))
        }
    }, [selectedEntity, choose, column, show, show]);

    return {
        chosenValue,
        selectedEntity,
        setChosenValue,
        setSelectedEntity,
        setShownValue,
        shownValue,
    }
}

export default useBrowser