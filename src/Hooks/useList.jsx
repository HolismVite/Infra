import { useState, useEffect } from 'react'
import app from '../Base/App';
import { get } from '../Base/Api';
import useMessage from './useMessage';

const useList = ({
    entityType,
    isTree,
}) => {

    var key = ''
    key += app.userGuid()
    if (entityType) {
        key += `_${entityType}`
    }
    key += '_listParameters'
    var value = window.localStorage.getItem(key)
    var existingParameters = (value === null ? {} : JSON.parse(value))

    const [pageNumber, setPageNumber] = useState(existingParameters.pageNumber || 1)
    const [pageSize, setPageSize] = useState(existingParameters.pageSize || 5)
    const [filters, setFilters] = useState(existingParameters.filters || [])
    const [sorts, setSorts] = useState(existingParameters.sorts || [])
    const [loading, setLoading] = useState();
    const [data, setData] = useState([]);
    const [metadata, setMetadata] = useState({});
    const [hasData, setHasData] = useState(false)
    const [selectedEntities, setSelectedEntities] = useState([])
    const { error } = useMessage()

    const addFilter = (property, value, operator) => {
        var isAdded = false;
        for (var i = 0; i < filters.length; i++) {
            if (filters[i].property === property) {
                if (filters[i].operator && operator && filters[i].operator === operator) {
                    filters[i].value = value;
                    isAdded = true;
                }
            }
        }
        if (!isAdded) {
            filters.push({ property: property, operator: operator, value: value });
        }
    }

    const removeFilter = (property) => {

    }

    const resetFilters = () => {
        setFilters([])
    }

    const addSort = (property, direction) => {

    }

    const removeSort = (property) => {

    }

    const storeInLocalStorage = () => {
        window.localStorage.setItem(key, JSON.stringify({
            pageNumber,
            pageSize,
            filters,
            sorts
        }));
    }

    useEffect(() => {
        storeInLocalStorage()
        reload()
    }, [pageNumber, pageSize, filters, sorts])

    useEffect(() => {
        console.log(filters)
    }, [filters])

    const buildFiltersQueryString = () => {
        //filters=title_contains_hi&stateId_eq_closed&userAge_gt_35
        var query = "";
        for (var i = 0; i < filters.length; i++) {
            var filter = filters[i];
            if (app.isSomething(filter.value)) {
                query += `&${filter.property}_${filter.operator}_${filter.value}`;
            }
        }
        if (query.startsWith('&')) {
            query = query.slice(1);
        }
        return query;
    }

    const buildSortsQueryString = () => {
        var query = "";
        for (var i = 0; i < sorts.length; i++) {
            var sort = sorts[0];
            if (sort.column) {
                query += `&${sort.column}_${sort.direction}`;
            }
        }
        query = query.slice(1);
        return query;
    }

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
            url += `list?pageNumber=${pageNumber}&pageSize=${pageSize}`
        }
        const filters = buildFiltersQueryString();
        if (filters) {
            url += `&filters=${filters}`;
        }
        const sorts = buildSortsQueryString();
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
        addFilter,
        addSort,
        buildFiltersQueryString,
        buildSortsQueryString,
        data,
        deselectEntities,
        deselectEntity,
        filters,
        hasData,
        loading,
        metadata,
        pageNumber,
        pageSize,
        reload,
        reloadEntity,
        removeFilter,
        removeSort,
        resetFilters,
        selectedEntities,
        selectEntities,
        selectEntity,
        setEntity,
        setEntityProgress,
        setPageNumber,
        setPageSize,
        sorts,
    }
}

export default useList