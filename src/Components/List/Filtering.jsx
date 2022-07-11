import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import app from 'App'
import { ListContext } from 'Contexts'

const Filtering = ({ filters }) => {

    const {
        resetFilters,
        reload
    } = useContext(ListContext);

    if (!filters || filters.props.children.length === 0) {
        return <div></div>
    }

    const applyFilters = () => {
        reload()
    };

    const reset = () => {
        resetFilters()
        applyFilters();
    }

    const handleKeyPress = (event) => {
        if (event.charCode !== 13) {
            return;
        }
        applyFilters();
    }

    const filtersArray = filters.props.children.map ? filters.props.children : [filters.props.children];

    return <div id='filtering' className="bg-white px-3 py-3 md:rounded-lg relative dark:bg-zinc-700 " onKeyPress={(event) => handleKeyPress(event)}>
        <div className={"grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}>
            {
                filtersArray.map((filter, index) => React.cloneElement(filter, {
                    key: index,
                }))
            }
            <div className={"flex justify-end md:col-start-2 lg:col-start-3 xl:col-start-4 gap-2"}>
                {
                    // filters?.length > 0 &&
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={reset}>
                        {app.t('Reset')}
                    </Button>
                }
                <Button
                    size="small"
                    className={"bg-green-200 hover:bg-green-400"}
                    variant="outlined"
                    onClick={applyFilters}>
                    {app.t('Apply')}
                </Button>
            </div>
        </div>

    </div>
}

export default Filtering;