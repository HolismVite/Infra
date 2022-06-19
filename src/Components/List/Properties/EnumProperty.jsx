import { useState, useEffect, useContext } from 'react'
import Collapse from '@mui/material/Collapse';
import CheckIcon from '@mui/icons-material/Check';
import { Chip } from "./Chip"
import { DialogForm, Progress, HolismIcon, get, post, useMessage } from '@Form'
import { ListContext } from '../Contexts';

const EnumProperty = ({
    enumeration,
    currentKey,
    currentStyle,
    styleProvider,
    actionUrl
}) => {
    const [progress, setProgress] = useState(false)
    const [enumItems, setEnumItems] = useState([])
    const [selectedEnum, setSelectedEnum] = useState({ key: currentKey })
    const { error } = useMessage()
    const { setEntity } = useContext(ListContext)

    const current =
        <Chip
            className={currentStyle + " select-none " + (actionUrl && " cursor-pointer hover:shadow-md hover:scale-105 transition-all")}
            text={currentKey}
        />

    const inputs = <>
        {
            progress
                ?
                <Progress />
                :
                <>
                    {
                        enumItems.map(item => <div
                            key={item.id}
                            onClick={() => setSelectedEnum(item)}
                            className="mb-2"
                        >
                            <Chip
                                className={styleProvider(item.key) + " select-none transition-all cursor-pointer " + (item.id === selectedEnum.id && " shadow-lg scale-110 ")}
                                text={item.key}
                            />
                            {
                                item.key !== currentKey && item.id === selectedEnum.id &&
                                <HolismIcon className="mx-6" icon={CheckIcon} />
                            }
                        </div>)
                    }
                    <Collapse
                        in={selectedEnum.key !== currentKey}
                    >
                        <div
                            className="border-t mt-6 pt-6 flex justify-center"
                        >
                            {current}
                            <span className="mx-4
                        ">{'=>'}</span>
                            <Chip
                                className={styleProvider(selectedEnum.key) + " select-none transition-all "}
                                text={selectedEnum.key}
                            />
                        </div>
                    </Collapse>
                </>
        }
    </>

    const save = () => {
        if (selectedEnum.key === currentKey) {
            setOpen(false)
            return;
        }
        setProgress(true)
        post(actionUrl + `?newEnumId=${selectedEnum.id}`)
            .then(data => {
                setProgress(false)
                setOpen(false)
                setEntity(data)
            }, e => {
                setProgress(false)
                error(e)
            })
    }

    useEffect(() => {
        if (!open) {
            return;
        }
        setProgress(true)
        get(`/${enumeration}/all`)
            .then(data => {
                setEnumItems(data)
                setProgress(false)
            }, e => {
                error(e)
                setProgress(false)
            })
    }, [open])

    return <div>
        <DialogForm
            entityType='Enumeration'
            title='Set new value'
            inputs={inputs}
            close={() => { }}
            okAction={save}
        />
        <span
            onClick={() => { }}
        >
            {current}
        </span>
    </div>
}

export default EnumProperty
export { EnumProperty }