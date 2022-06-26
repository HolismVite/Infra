import { useState, useContext } from 'react'
import UploadIcon from '@mui/icons-material/Upload';
import app from 'App'
import { upload } from 'App'
import { useMessage } from 'Hooks'
import { DialogContext } from 'Contexts'
import { TableContext } from 'Contexts'
import Dialog from '../../Dialog/Dialog'
import Upload from '../../Form/Fields/Upload'
import OkCancel from '../../Dialog/OkCancel';
import FormElement from '../../Form/FormElement'
import HolismIcon from '../../HolismIcon'

const Image = ({
    url,
    alt,
    uploadUrl
}) => {

    const [open, setOpen] = useState(false)
    const [progress, setProgress] = useState(false)
    const { hasMoreRoom } = useContext(TableContext)
    const { success, error } = useMessage()

    const uploadImage = () => {
        var form = new FormData();
        app.selectedFiles.forEach(file => {
            form.append('file', file);
        });
        setProgress(true)
        upload(uploadUrl, form)
            .then(data => {
                setProgress(false)
                success('Image uploaded successfully')
                setOpen(false)
                // app.emit(app.entityReloadRequested, { entity: data })
            }, e => {
                setProgress(false)
                error(e)
            })
    }

    return <div className="relative inline-block">
        {
            uploadUrl &&
            <DialogContext.Provider
                value={{
                    open,
                    setOpen
                }}
            >
                <Dialog
                    title='Upload image'
                    content={<>
                        {/* <Explanations explanations={explanations} /> */}
                        <FormElement
                            id='uploadImageForm'
                            inputs={<>
                                <Upload
                                />
                            </>}
                        />
                    </>}
                    actions={
                        <OkCancel
                            progress={progress}
                            okClick={() => uploadImage()}
                            cancelClick={() => setOpen(false)}
                        />
                    }
                    onEntered={() => {
                        // focusFirstInput('uploadImageForm')
                    }}
                />
            </DialogContext.Provider>
        }
        <span className="group" onClick={() => setOpen(true)}>
            <img src={url} alt={alt || ''} className={(hasMoreRoom ? "w-12 h-12" : "w-8 h-8 ") + " object-cover rounded-full " + (uploadUrl && "cursor-pointer group-hover:shadow-md group-hover:shadow-black transition-all")} />
            {
                uploadUrl &&
                <HolismIcon
                    icon={UploadIcon}
                    className={(hasMoreRoom ? "left-8 " : "left-6 ") + " w-4 h-4 absolute bottom-0 cursor-pointer text-slate-900 bg-white  rounded-full p-0.5 group-hover:bg-slate-900 group-hover:text-white transition-colors"}
                />
            }
        </span>
    </div>
}

export default Image 