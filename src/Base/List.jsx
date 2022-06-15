const List = {
    addItemToSelectedEntities: (listContext, id) => {
        if (!id) {
            return;
        }
        const { selectedEntities, setSelectedEntities } = listContext;
        if (selectedEntities.indexOf(id) > -1) {
            return;
        }
        setSelectedEntities((previousSelectedEntities) => {
            return [id, ...previousSelectedEntities];
        });
    },
    addItemsToSelectedEntities: (listContext, items) => {
        if (!items || items.length === 0) {
            return;
        }
        if (!items[0].id) {
            return;
        }
        const { setSelectedEntities } = listContext;
        setSelectedEntities((previousSelectedEntities) => {
            let newItems = items.map(i => i.id);
            return [...previousSelectedEntities, ...newItems];
        });
    },
    removeItemFromSelectedEntities: (listContext, id) => {
        if (!id) {
            return;
        }
        const { selectedEntities, setSelectedEntities } = listContext;
        if (selectedEntities.indexOf(id) === -1) {
            return;
        }
        setSelectedEntities((previousSelectedEntities) => {
            selectedEntities.splice(selectedEntities.indexOf(id), 1);
            return [...selectedEntities];
        });
    },
    removeItemsFromSelectedEntities: (listContext, items) => {
        if (!items || items.length === 0) {
            return;
        }
        if (!items[0].id) {
            return;
        }
        const { setSelectedEntities } = listContext;
        setSelectedEntities((previousSelectedEntities) => {
            let itemsToBeDeleted = items.map(i => i.id);

            return previousSelectedEntities.filter(i => !itemsToBeDeleted.includes(i));
        });
    }
}

export default List;