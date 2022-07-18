import { useState, useContext } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { post } from 'App'
import { ListContext } from 'Contexts'
import { DialogContext } from 'Contexts'
import DialogForm from '../../Form/DialogForm'
import Code from '../../Form/Fields/Code'
import HolismIcon from '../../HolismIcon'

const SvgProperty = ({
    actionUrl,
    value,
}) => {
    const [open, setOpen] = useState(false)

    const { setEntity } = useContext(ListContext)

    const save = ({
        data,
        error,
        setProgress,
        success,
    }) => {
        if (!actionUrl || app.isNothing(actionUrl)) {
            return;
        }
        setProgress(true);
        var api = actionUrl;
        if (typeof actionUrl === 'function') {
            api = actionUrl(data.value);
        }
        post(api).then(data => {
            setProgress(false);
            success('Applied');
            setEntity(data)
            setOpen(false)
        }, e => {
            error(e);
            setProgress(false);
        });
    }

    return <DialogContext.Provider
        value={{
            open,
            setOpen,
        }}
    >
        <span
            className={actionUrl && "cursor-pointer flex gap-2 justify-center items-center group"}
            title={actionUrl && 'Click to change'}
            onClick={() => actionUrl && setOpen(true)}
        >
            <span>{value}</span>
            {
                actionUrl && <HolismIcon
                    icon={EditIcon}
                    className="text-sm group-hover:text-red-400"
                />
            }
        </span>
        <DialogForm
            title='Edit'
            inputs={<Code
                column='value'
            />}
            okAction={save}
        />

    </DialogContext.Provider>
}

export default SvgProperty