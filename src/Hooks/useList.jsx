import { useState } from 'react'

const useList = () => {

    const [loading, setLoading] = useState();
    const [data, setData] = useState([]);
    const [metadata, setMetadata] = useState({});
    const [hasData, setHasData] = useState(false)

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

    return {
        setEntityProgress,
        setEntity,
        reload
    }
}

export default useList