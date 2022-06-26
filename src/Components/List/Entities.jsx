import React, { useState, useEffect, useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { ListContext } from 'Contexts'
import { useLocalStorageState } from 'Hooks'
import Cards from './EntitiesCards'
import Table from './EntitiesTable'
import Tree from './EntitiesTree';

const Entities = (props) => {

    const {
        isTree
    } = props;

    const {
        card,
        loading,
    } = useContext(ListContext);

    return <div id='items' className={
        'bg-white dark:bg-zinc-700 transition-colors py-6 md:rounded-lg flex flex-col items-center justify-center '
        + (card && " flex-col")
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
                        <Tree {...props} />
                        :
                        card
                            ?
                            <Cards {...props} />
                            :
                            <Table {...props} />
                )
        }
    </div>
}

export default Entities;