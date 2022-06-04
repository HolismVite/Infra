import { useContext } from 'react'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { FormContext, app } from '@Form';

const Actions = ({
    actions,
    className,
    handleSubmit
}) => {

    const { isValid, progress } = useContext(FormContext)

    return <div id='actions' className={'mt-4 ' + className}>
        {
            actions ||
            <div className="mr-6 mb-6" >
                {
                    progress
                        ?
                        <CircularProgress size={30} />
                        :
                        <>
                            <Button
                                tabIndex={-1}
                                className="text-gray-900 border-gray-400 "
                                variant="outlined"
                                onClick={() => app.emit(app.formCanceled)}
                            >
                                {app.t('Cancel')}
                            </Button>
                            <Button
                                variant="outlined"
                                className={'ml-2' + (isValid ? " bg-green-200 text-gray-900 border-gray-400 " : "")}
                                onClick={(e) => handleSubmit(e)}
                                disabled={!isValid}
                            >
                                {app.t('Save')}
                            </Button>
                        </>
                }
            </div>
        }
    </div>
}

export { Actions }