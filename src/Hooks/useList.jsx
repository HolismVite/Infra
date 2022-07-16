import { useState, useEffect } from 'react'
import app from 'App'
import { get } from 'App'
import { useMessage } from 'Hooks'

const useList = ({
    entityType,
    isBrowse,
    isTree,
}) => {

    var key = `${app.camelize(entityType)}${isBrowse && '_browse'}_listParameters`
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
    const [resetRequested, setResetRequested] = useState(false)
    const [hasGuid, setHasGuid] = useState(false)
    const [hasKey, setHasKey] = useState(false)
    const [hasOrder, setHasOrder] = useState(false)
    const [hasSlug, setHasSlug] = useState(false)

    const setFilter = (property, value, operator) => {
        if (filters.find(i => i.property === property)) {
            if (value) {
                const newFilters = filters.map((i) => {
                    return i.property === property && i.operator === operator
                        ? { property, value, operator }
                        : i
                })
                setFilters(newFilters)
            }
            else {
                const newFilters = filters.filter(i => i.property !== property)
                setFilters(newFilters)
            }
        }
        else {
            if (value) {
                const newFilters = [...filters, { property, value, operator }]
                setFilters(newFilters)
            }
        }
    }

    const removeFilter = (property) => {

    }

    const resetFilters = () => {
        setFilters([])
        setResetRequested(true)
    }

    const addSort = (property, direction) => {

    }

    const removeSort = (property) => {

    }

    const storeInLocalStorage = () => {
        window.localStorage.setItem(key, JSON.stringify({
            pageNumber,
            pageSize,
            filters: filters.filter(i => i.value),
            sorts
        }));
    }

    useEffect(() => {
        storeInLocalStorage()
    }, [pageNumber, pageSize, filters, sorts])

    useEffect(() => {
        reload()
    }, [pageNumber, pageSize, sorts])

    useEffect(() => {
        console.log(filters)
        if (resetRequested && filters.length === 0) {
            reload()
            setResetRequested(false)
        }
    }, [filters, resetRequested])

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
        let url = `${app.camelize(entityType)}/`;
        if (isTree) {
            url += 'tree'
        }
        else {
            url += `list?pageNumber=${pageNumber}&pageSize=${pageSize}`
        }
        const filters = encodeURIComponent(buildFiltersQueryString())
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
        get(`${app.camelize(entityType)}/get/${entity.id}`)
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
            const firstRecord = data[0]
            if (firstRecord.hasOwnProperty('guid')) {
                setHasGuid(true)
            }
            if (firstRecord.hasOwnProperty('key')) {
                setHasKey(true)
            }
            if (firstRecord.hasOwnProperty('order')) {
                setHasOrder(true)
            }
            if (firstRecord.hasOwnProperty('slug')) {
                setHasSlug(true)
            }
        }
        else {
            setHasData(false)
        }
    }, [data])

    useEffect(() => {
        load();
    }, []);

    return {
        addSort,
        buildFiltersQueryString,
        buildSortsQueryString,
        data,
        deselectEntities,
        deselectEntity,
        hasData,
        hasGuid,
        hasKey,
        hasOrder,
        hasSlug,
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
        setFilter,
        setPageNumber,
        setPageSize,
        setSorts,
        sorts,
        usedFilters: filters,
    }
}

export default useList