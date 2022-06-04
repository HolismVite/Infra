import React, { useState, useEffect, useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { ListContext, useLocalStorageState, app, get } from '@List';
import Cards from './ItemsCards'
import Table from './ItemsTable'
import Tree from './ItemsTree';

const Items = (props) => {

    const { entityType, card, headers, row, classProvider, isTree } = props;
    app.ensure([entityType]);

    const [loading, setLoading] = useState();
    const [data, setData] = useState([]);
    const [metadata, setMetadata] = useState({});
    const { listParameters, setHasData } = useContext(ListContext);
    const [showTopPagiation, setTopPaginationVisibility] = useLocalStorageState(false, `${app.userGuid()}_${entityType}_isTopPaginationShown`);

    useEffect(() => {
        const setVisibility = () => {
            setTopPaginationVisibility(!showTopPagiation);
        };
        app.on(app.toggleTopPagination, setVisibility);
        return () => {
            app.removeListener(app.toggleTopPagination, setVisibility);
        }
    });

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

    useEffect(() => {
        const onEntityReloadRequested = ({ entity }) => {
            setEntityProgress(entity, true);
            get(`${entityType}/get/${entity.id}`)
                .then(result => {
                    setEntityProgress(entity, false)
                    setItem(result)
                }, error => {
                    setEntityProgress(entity, false)
                    app.error(error)
                })
        }
        app.on(app.entityReloadRequested, onEntityReloadRequested)
        return () => {
            app.removeListener(app.entityReloadRequested, onEntityReloadRequested)
        }
    }, [entityType])

    useEffect(() => {
        const onEntityRerenderRequested = (entity) => {
            setItem(entity)
        }
        app.on(app.entityRerenderRequested, onEntityRerenderRequested)
        return () => app.removeListener(app.entityRerenderRequested, onEntityRerenderRequested)
    }, [entityType])

    const setItem = (item) => {
        setData((data) => {
            for (var i = 0; i < data.length; i++) {
                if (data[i].id === item.id) {
                    data[i] = item;
                }
            }
            return [...data];
        });
    }

    const reload = (item) => {
        load();
    }

    if (classProvider && typeof classProvider !== 'function') {
        console.warn('classProvider should be a function');
    }

    if (!row && !card && !isTree) {
        throw new Error('You should either provide a row or a card component, or you should be a tree');
    }

    if (row && !headers) {
        throw new Error('When you provide row, you should also provide headers component');
    }

    const load = () => {
        listParameters.storeInLocalStorage();
        setLoading(true);
        let url = `${entityType}/`;
        if (isTree) {
            url += 'tree'
        }
        else {
            url += `list?pageNumber=${listParameters.pageNumber}&pageSize=${listParameters.pageSize}`
        }
        const filters = listParameters.filtersQueryString();
        if (filters) {
            url += `&filters=${filters}`;
        }
        const sorts = listParameters.sortsQueryString();
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

    useEffect(() => {
        app.on(app.itemUpserted, load);
        return () => {
            app.removeListener(app.itemUpserted, load);
        }
    }, []);

    useEffect(() => {
        app.on(app.reloadRequested, load);
        return () => {
            app.removeListener(app.reloadRequested, load);
        }
    }, [])

    useEffect(() => {
        load();
    }, []);

    useEffect(() => {
        if (data && Array.isArray(data) && data.length !== 0) {
            setHasData(true)
        }
        else {
            setHasData(false)
        }
    }, [data])

    return <div id='items' className={
        'bg-white dark:bg-zinc-700 transition-colors py-6 md:rounded-lg flex flex-col items-center justify-center '
        +
        (
            card
                ?
                " flex-col"
                :
                ""
        )
    }
        style={{
            maxWidth: '100vw'
        }}
    >
        {
            loading
                ?
                <CircularProgress
                    className="my-12"
                />
                :
                (
                    isTree
                        ?
                        <Tree
                            {...props}
                            loading={loading}
                            data={data}
                            metadata={metadata}
                            setItem={setItem}
                            reload={reload}
                        />
                        :
                        card
                            ?
                            <Cards {...props}
                                loading={loading}
                                data={data}
                                metadata={metadata}
                                setItem={setItem}
                                reload={reload}
                                showTopPagiation={showTopPagiation}

                            />
                            :
                            <Table {...props}
                                loading={loading}
                                data={data}
                                metadata={metadata}
                                setItem={setItem}
                                reload={reload}
                                showTopPagiation={showTopPagiation}
                            />
                )
        }
    </div>
}

export default Items;