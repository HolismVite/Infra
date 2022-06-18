import app from '../Base/App'
import { useState, useEffect } from 'react'

const useListParameters = (userGuid, entityType) => {
    var key = ''
    if (userGuid) {
        key += userGuid
    }
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

    return {
        addFilter,
        addSort,
        buildFiltersQueryString,
        buildSortsQueryString,
        filters,
        pageNumber,
        pageSize,
        removeFilter,
        removeSort,
        resetFilters,
        setPageNumber,
        setPageSize,
        sorts,
    }
}

export default useListParameters