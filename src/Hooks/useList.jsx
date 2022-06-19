import { useState, useEffect } from 'react'
import app from '../Base/App';
import useListParameters from './useListParameters'
import { get } from '../Base/Api';
import useMessage from './useMessage';

const useList = ({
    entityType,
    isTree
}) => {

    const [loading, setLoading] = useState();
    const [data, setData] = useState([]);
    const [metadata, setMetadata] = useState({});
    const [hasData, setHasData] = useState(false)
    const [selectedEntities, setSelectedEntities] = useState([])
    const listParameters = useListParameters(app.userGuid(), entityType)
    const { error } = useMessage()

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
        }, (e) => {
            error(e);
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
            const all = [id, ...previousSelectedEntities]
            const unique = [...new Set(all)].sort()
            return unique;
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
            const all = [...previousSelectedEntities, ...newItems]
            const unique = [...new Set(all)].sort()
            return unique;
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

    const reloadEntity = (entity) => {
        setEntityProgress(entity, true);
        get(`${entityType}/get/${entity.id}`)
            .then(result => {
                setEntityProgress(entity, false)
                setEntity(result)
            }, e => {
                setEntityProgress(entity, false)
                error(e)
            })
    }

    useEffect(() => {
        if (data && Array.isArray(data) && data.length !== 0) {
            setHasData(true)
        }
        else {
            setHasData(false)
        }
    }, [data])

    useEffect(() => {
        load();
    }, []);

    return {
        data,
        deselectEntities,
        deselectEntity,
        hasData,
        listParameters,
        loading,
        metadata,
        reload,
        reloadEntity,
        selectEntities,
        selectEntity,
        selectedEntities,
        setEntity,
        setEntityProgress,
    }
}

export default useList