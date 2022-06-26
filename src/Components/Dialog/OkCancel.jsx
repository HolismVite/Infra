import CircularProgress from '@mui/material/CircularProgress';
import PrimaryAction from './PrimaryAction';
import CancelAction from './CancelAction';

const OkCancel = ({
    progress,
    okText,
    okClick,
    cancelText,
    cancelClick
}) => {

    return <div id='actions' className={'mt-4 '}>
        <div>
            {
                progress
                    ?
                    <CircularProgress size={30} />
                    :
                    <>
                        <CancelAction
                            text={cancelText}
                            click={cancelClick}
                        />
                        <PrimaryAction
                            text={okText}
                            click={okClick}
                        />
                    </>
            }
        </div>
    </div>
}

export default OkCancel