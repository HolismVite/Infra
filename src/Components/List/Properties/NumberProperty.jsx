import { useState } from 'react'
import DialogForm from '../../Form/DialogForm'
import DialogContext from 'Contexts'

const NumberProperty = ({
    actionUrl,
    value,
}) => {

    const [open, setIsOpen] = useState(false)

    return <DialogContext.Provider
        value={{
            open,
            setOpen,
        }}
    >
        <span
            className={actionUrl && "cursor-pointer"}
            title={actionUrl && 'Click to change'}
            onClick={() => actionUrl && setOpen(true)}
        >
            <span>{value || 'NA'}</span>
        </span>
        <DialogForm
            title='Edit'
            inputs={<Numeric
                column='Value'
            />}
            okAction={({
                data,
                error,
                setProgress,
                success,
            }) => {
                console.log(data)
            }}
        />

    </DialogContext.Provider>
}

export default NumberProperty