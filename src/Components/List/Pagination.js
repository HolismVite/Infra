import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PositiveInteger from "../Inputs/PositiveInteger";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ListContext, app } from '@List'

const textStyle = "text-blue-900 p-2 font-light text-xs items-center cursor-pointer uppercase hover:bg-blue-50 rounded-lg";

const Pagination = ({ metadata }) => {

    const { from, to, pageNumber, pageSize, pagesCount, totalCount } = metadata;
    const [pageNumberDialogIsOpen, setPageNumberDialogVisibility] = useState(false);
    const [pageSizeDialogIsOpen, setPageSizeDialogVisibility] = useState(false);

    const [internalPageSize, setInternalPageSize] = useState(pageSize);

    const { listParameters } = useContext(ListContext);

    const goToPage = (number) => {
        if (number > pagesCount) {
            number = pagesCount;
        }
        listParameters.pageNumber = number;
        app.emit(app.reloadRequested);
    };

    const setPageSize = () => {
        listParameters.pageSize = internalPageSize;
        listParameters.pageNumber = 1;
        app.emit(app.reloadRequested);
    };

    const pageNumberDialog = <Dialog
        open={pageNumberDialogIsOpen}
        aria-labelledby="dialog-title"
        TransitionProps={{ onEntered: () => { document.querySelector('#goToPageInput').focus() } }}
    >
        <DialogTitle id="dialog-title">{app.t('Go to page')}</DialogTitle>
        <DialogContent>
            <form
                noValidate
                onSubmit={() => { }}
            >
                <div id='fields'>
                    <PositiveInteger onEnter={(value) => {
                        if (value) {
                            goToPage(value)
                        }
                    }} />
                </div>
            </form>
        </DialogContent>
        <DialogActions>
            <div id='actions' className='mt-4'>
                <Button variant="outlined" onClick={() => setPageNumberDialogVisibility(false)}>
                    {app.t('Cancel')}
                </Button>
                <Button variant="outlined" className='bg-green-200 ml-2' onClick={() => {
                    var value = document.querySelector('#goToPageInput').value;
                    if (value) {
                        goToPage(value);
                    }
                }}>
                    {app.t('Go')}
                </Button>
            </div>
        </DialogActions>
    </Dialog>

    const pageSizeDialog = <Dialog
        open={pageSizeDialogIsOpen}
        aria-labelledby="dialog-title"
        TransitionProps={{ onEntered: () => { /*document.querySelector('#pageSizeSelect').focus()*/ } }}
    >
        <DialogTitle id="dialog-title">{app.t('Select page size')}</DialogTitle>
        <DialogContent>
            <FormControl fullWidth className="mt-4">
                <InputLabel>
                    {app.t('Page size')}
                </InputLabel>
                <Select
                    label={app.t('Page size')}
                    value={internalPageSize}
                    onChange={(e) => { setInternalPageSize(e.target.value) }}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                </Select>
            </FormControl>
        </DialogContent>
        <DialogActions>
            <div id='actions' className='mt-4'>
                <Button variant="outlined" onClick={() => setPageSizeDialogVisibility(false)}>
                    {
                        app.t('Cancel')
                    }
                </Button>
                <Button variant="outlined" className='bg-green-200 ml-2' onClick={() => {
                    setPageSize();
                }}>
                    {
                        app.t('Save')
                    }
                </Button>
            </div>
        </DialogActions>
    </Dialog>

    return <div
        id='pagination'
        className={
            "flex flex-col md:flex-row justify-between items-center w-full"
            + (app.isRtl() ? " md:flex-row-reverse " : "")
        }
    >
        {pageNumberDialog}
        {pageSizeDialog}
        <Button id='goToPage' className={textStyle + " text-left"} onClick={() => setPageNumberDialogVisibility(true)}>
            {/* <TextField
                label="Page"
                variant="outlined"
                size="small"
                className="w-24"
                InputLabelProps={{ className: "text-sm" }}
            />
            <Button className="ml-2" variant="outlined">Go</Button> */}
            {app.t('Page')} #
        </Button>
        <div
            id='pageLinks'
            className={
                "flex-1 items-center flex justify-center"
                + (app.isRtl() ? " flex-row-reverse " : "")
            }
        >
            <IconButton disabled={pageNumber === 1} onClick={() => goToPage(1)}>
                <Tooltip title={app.t('First page')}>
                    {
                        app.isRtl()
                            ?
                            <LastPageIcon />
                            :
                            <FirstPageIcon />
                    }
                </Tooltip>
            </IconButton>
            <IconButton disabled={pageNumber === 1} onClick={() => goToPage(pageNumber - 1)}>
                <Tooltip title={app.t('Previous page')}>
                    {
                        app.isRtl()
                            ?
                            <ChevronRightIcon />
                            :
                            <ChevronLeftIcon />
                    }
                </Tooltip>
            </IconButton>
            <span className="mx-4">{pageNumber}</span>
            <IconButton disabled={pageNumber >= pagesCount} onClick={() => goToPage(pageNumber + 1)}>
                <Tooltip title={app.t('Next page')}>
                    {
                        app.isRtl()
                            ?
                            <ChevronLeftIcon />
                            :
                            <ChevronRightIcon />
                    }
                </Tooltip>
            </IconButton>
            <Tooltip title={app.t('Last page') + (pagesCount ? ` - ${pagesCount}` : "")}>
                <span>
                    <IconButton disabled={pageNumber >= pagesCount} onClick={() => goToPage(pagesCount)}>
                        {
                            app.isRtl()
                                ?
                                <FirstPageIcon />
                                :
                                <LastPageIcon />
                        }
                    </IconButton>
                </span>
            </Tooltip>
        </div>
        <Button id='statsAndPageSize' className={textStyle + " text-right"} onClick={() => setPageSizeDialogVisibility(true)}>
            {
                from
                    ?
                    <>
                        <span className="text-blue-900">{from}</span>
                        <span className="mx-2">-</span>
                        <span className="text-blue-900">{to}</span>
                    </>
                    :
                    null
            }
            {
                totalCount
                    ?
                    <>
                        <span className="mx-2">/</span>
                        <span className="text-blue-900">{totalCount}</span>
                    </>
                    :
                    null
            }
        </Button>
    </div>
}

export default Pagination;