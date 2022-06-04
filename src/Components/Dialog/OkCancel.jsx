import CircularProgress from '@mui/material/CircularProgress';
import { PrimaryAction } from './PrimaryAction';
import { CancelAction } from './CancelAction';

const OkCancel = ({
    progress,
    okClick,
    cancelClick
}) => {

    return <div id='actions' className={'mt-4 '}>
        <div className="mr-6 mb-6" >
            {
                progress
                    ?
                    <CircularProgress size={30} />
                    :
                    <>
                        <CancelAction click={cancelClick} />
                        <PrimaryAction click={okClick} />
                    </>
            }
        </div>
    </div>
}

export { OkCancel }