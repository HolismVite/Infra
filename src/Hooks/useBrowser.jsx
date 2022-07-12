import React, { useState, useEffect } from 'react';

const useBrowser = ({
    show,
    choose,
    column,
    setValue,
}) => {

    app.ensure([show, choose])
    const [selectedEntity, setSelectedEntity] = useState(null);

    useEffect(() => {
        if (!selectedEntity) {
            show('');
            setValue(null);
            return;
        }
        if (typeof show(selectedEntity) === "undefined") {
            throw new Error(`No dispaly value specified for Browse ${'id'} `)
        }
        else {
            if (typeof choose === "function") {
                try {
                    let chosenValue = choose(selectedEntity);
                    if (typeof chosenValue === "undefined" || typeof chosenValue === "function")
                        throw new Error(`No return value specified for ${column} browser chooser function`)
                    setValue(chosenValue, true);
                } catch (error) {
                    throw new Error(`No return value specified for ${column} browser chooser function`);
                }
            }
            else if (column.endsWith('Guid')) {
                setValue(selectedEntity.guid, true);
            }
            else if (column.endsWith('Id')) {
                setValue(selectedEntity.id, true);
            }
            else {
                throw new Error(`No return value specified for ${column} browser chooser function`);
            }
            show(selectedEntity)
        }
    }, [selectedEntity, choose, column, show, setValue, show]);

    return {
        selectedEntity,
        setSelectedEntity,
    }
}

export default useBrowser