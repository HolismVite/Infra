import React, { useContext } from 'react';
import { ListContext } from './List';
import Button from '@mui/material/Button';
import app from '../../Base/App';

const Filtering = ({ filters }) => {

    const { listParameters } = useContext(ListContext);

    if (!filters || filters.props.children.length === 0) {
        return <div></div>
    }

    const applyFilters = () => {
        app.emit(app.reloadRequested);
    };

    const resetFilters = () => {
        listParameters.filters = [];
        app.emit(app.resetFilters);
        applyFilters();
    }

    const handleKeyPress = (event) => {
        if (event.charCode !== 13) {
            return;
        }
        applyFilters();
    }

    const filtersArray = filters.props.children.map ? filters.props.children : [filters.props.children];

    return <div id='filtering' className="bg-white px-6 py-3 md:rounded-lg relative" onKeyPress={(event) => handleKeyPress(event)}>
        <div className={"flex flex-wrap " + (app.isRtl() ? ' flex-row-reverse ' : '')}>
            {
                filtersArray.map((filter, index) => React.cloneElement(filter, {
                    key: index,
                    className: (app.isRtl() ? 'mr-4' : "ml-4")
                }))
            }
            <div className={"flex justify-end mt-6 sm:mt-3 flex-1" + (app.isRtl() ? ' flex-row-reverse ' : '')}>
                <Button
                    size="small"
                    variant="outlined"
                    onClick={resetFilters}>
                    {app.t('Reset')}
                </Button>
                <Button
                    size="small"
                    className={"bg-green-200 hover:bg-green-400 " + (app.isRtl() ? 'mr-2' : ' ml-2')}
                    variant="outlined"
                    onClick={applyFilters}>
                    {app.t('Apply')}
                </Button>
            </div>
        </div>

    </div>
}

export default Filtering;