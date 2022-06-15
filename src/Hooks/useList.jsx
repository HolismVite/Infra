import { useState, useContext } from 'react'
import { ListContext } from '../Components/List/Contexts';

const useList = () => {

    const [loading, setLoading] = useState();
    const [data, setData] = useState([]);
    const [metadata, setMetadata] = useState({});
    const [hasData, setHasData] = useState(false)

    const { selectedEntities, setSelectedEntities } = useContext(ListContext)

    const setEntityProgress = (entity, progress) => {
        setData((data) => {
            for (var i = 0; i < data.length; i++) {
                if (data[i].id === entity.id) {
                    data[i].progress = progress;
                }
            }
            return [...data];
        });
    }

    const setEntity = (entity) => {
        setData((data) => {
            for (var i = 0; i < data.length; i++) {
                if (data[i].id === entity.id) {
                    data[i] = entity;
                }
            }
            return [...data];
        });
    }

    const load = () => {
        setLoading(true);
        let url = `${entityType}/`;
        if (isTree) {
            url += 'tree'
        }
        else {
            url += `list?pageNumber=${listParameters.pageNumber}&pageSize=${listParameters.pageSize}`
        }
        const filters = listParameters.buildFiltersQueryString();
        if (filters) {
            url += `&filters=${filters}`;
        }
        const sorts = listParameters.buildSortsQueryString();
        if (sorts) {
            url += `&sorts=${sorts}`;
        }
        if (window.location.search) {
            const query = window.location.search.slice(1);
            if (url.indexOf('?') > -1) {
                url += '&';
            }
            else {
                url += '?'
            }
            url += query
        }
        get(url).then((result) => {
            if (!result) {
                return;
            }
            if (isTree) {
                setData(result)
            }
            else {
                const { data, ...metadata } = result;
                setData(data);
                setMetadata(metadata);
            }
            setLoading(false);
        }, (error) => {
            app.error(error);
            setLoading(false);
        });
    };

    const reload = (item) => {
        load();
    }

    const selectEntity = (id) => {
        if (!id) {
            return;
        }
        if (selectedEntities.indexOf(id) > -1) {
            return;
        }
        setSelectedEntities((previousSelectedEntities) => {
            return [id, ...previousSelectedEntities];
        });
    }

    const selectEntities = (entities) => {
        if (!entities || entities.length === 0) {
            return;
        }
        if (!entities[0].id) {
            return;
        }
        setSelectedEntities((previousSelectedEntities) => {
            let newItems = entities.map(i => i.id);
            return [...previousSelectedEntities, ...newItems];
        });
    }

    const deselectEntity = (id) => {
        if (!id) {
            return;
        }
        if (selectedEntities.indexOf(id) === -1) {
            return;
        }
        setSelectedEntities((previousSelectedEntities) => {
            selectedEntities.splice(selectedEntities.indexOf(id), 1);
            return [...selectedEntities];
        });
    }

    const deselectEntities = (entities) => {
        if (!entities || entities.length === 0) {
            return;
        }
        if (!entities[0].id) {
            return;
        }
        setSelectedEntities((previousSelectedEntities) => {
            let entitiesToBeDeleted = entities.map(i => i.id);

            return previousSelectedEntities.filter(i => !entitiesToBeDeleted.includes(i));
        });
    }

    return {
        setEntityProgress,
        setEntity,
        reload,
        selectEntity,
        selectEntities,
        deselectEntity,
        deselectEntities
    }
}

export default useList