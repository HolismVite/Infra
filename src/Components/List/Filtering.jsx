import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import app from '../../Base/App';
import ListContext from './ListContext';

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

    return <div id='filtering' className="bg-white px-6 py-3 md:rounded-lg relative dark:bg-zinc-700 " onKeyPress={(event) => handleKeyPress(event)}>
        <div className={"flex flex-wrap "}>
            {
                filtersArray.map((filter, index) => React.cloneElement(filter, {
                    key: index,
                    className: ' ltr:ml-4 rtl:mr-4 '
                }))
            }
            <div className={"flex justify-end mt-6 sm:mt-3 flex-1"}>
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
                    className={"bg-green-200 hover:bg-green-400 ltr:ml-2 rtl:mr-2"}
                    variant="outlined"
                    onClick={applyFilters}>
                    {app.t('Apply')}
                </Button>
            </div>
        </div>

    </div>
}

export default Filtering;