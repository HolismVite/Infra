const List = {
    addItemToSelectedItems: (listContext, id) => {
        if (!id) {
            return;
        }
        const { selectedItems, setSelectedItems } = listContext;
        if (selectedItems.indexOf(id) > -1) {
            return;
        }
        setSelectedItems((previousSelectedItems) => {
            return [id, ...previousSelectedItems];
        });
    },
    addItemsToSelectedItems: (listContext, items) => {
        if (!items || items.length === 0) {
            return;
        }
        if (!items[0].id) {
            return;
        }
        const { setSelectedItems } = listContext;
        setSelectedItems((previousSelectedItems) => {
            let newItems = items.map(i => i.id);
            return [...previousSelectedItems, ...newItems];
        });
    },
    removeItemFromSelectedItems: (listContext, id) => {
        if (!id) {
            return;
        }
        const { selectedItems, setSelectedItems } = listContext;
        if (selectedItems.indexOf(id) === -1) {
            return;
        }
        setSelectedItems((previousSelectedItems) => {
            selectedItems.splice(selectedItems.indexOf(id), 1);
            return [...selectedItems];
        });
    },
    removeItemsFromSelectedItems: (listContext, items) => {
        if (!items || items.length === 0) {
            return;
        }
        if (!items[0].id) {
            return;
        }
        const { setSelectedItems } = listContext;
        setSelectedItems((previousSelectedItems) => {
            let itemsToBeDeleted = items.map(i => i.id);

            return previousSelectedItems.filter(i => !itemsToBeDeleted.includes(i));
        });
    }
}

export default List;