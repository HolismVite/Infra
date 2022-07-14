import { useState, useEffect, useContext } from 'react'
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import app from 'App'
import { upload } from 'App'
import { useMessage } from 'Hooks'
import { ListContext } from 'Contexts'
import { DialogContext } from 'Contexts'
import { TableContext } from 'Contexts'
import { FormContext } from 'Contexts'
import Dialog from '../../Dialog/Dialog'
import Upload from '../../Form/Fields/Upload'
import OkCancel from '../../Dialog/OkCancel'
import FormElement from '../../Form/FormElement'
import HolismIcon from '../../HolismIcon'
import Warning from '../../Message/Warning'
import { post } from '../../../Base/Api';

const Image = ({
    alt,
    deletionUrl,
    guid,
    uploadUrl,
    url,
}) => {

    const [uploadOpen, setUploadOpen] = useState(false)
    const [deletionOpen, setDeletionOpen] = useState(false)
    const [progress, setProgress] = useState(false)
    const { hasMoreRoom } = useContext(TableContext)
    const { success, error } = useMessage()
    const { reloadEntity } = useContext(ListContext)
    const [hasImage, setHasImage] = useState(false)

    useEffect(() => {
        const guid = url?.split('/')?.findLast(() => true)?.split('.')[0]
        setHasImage(guid !== '00000000-0000-0000-0000-000000000000')
    }, [url])

    const deleteImage = () => {
        if (!deletionUrl) {
            console.warn('deletion URL is not specified')
            return;
        }
        setProgress(true)
        post(deletionUrl, guid)
            .then(data => {
                setProgress(false)
                success('Image deleted successfully')
                setDeletionOpen(false)
                reloadEntity(data)
            }, e => {
                setProgress(false)
                error(e)
            })
    }

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
                setUploadOpen(false)
                reloadEntity(data)
            }, e => {
                setProgress(false)
                error(e)
            })
    }

    const showDeletion = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDeletionOpen(true)
    }

    return <div className="relative inline-block">
        {
            uploadUrl &&
            <DialogContext.Provider
                value={{
                    open: uploadOpen,
                    setOpen: setUploadOpen
                }}
            >
                <FormContext.Provider
                    value={{
                        setHasFile: () => { }
                    }}
                >
                    <Dialog
                        title='Upload image'
                        content={<>
                            <FormElement
                                inputs={<>
                                    <Upload />
                                </>}
                            />
                        </>}
                        actions={
                            <OkCancel
                                progress={progress}
                                okClick={() => uploadImage()}
                                cancelClick={() => setUploadOpen(false)}
                            />
                        }
                    />
                </FormContext.Provider>
            </DialogContext.Provider>
        }
        {
            hasImage &&
            <DialogContext.Provider
                value={{
                    open: deletionOpen,
                    setOpen: setDeletionOpen
                }}
            >
                <Dialog
                    title='Delete image'
                    content={
                        <Warning
                            title='Note'
                            text='Are you sure you want to delete this image?'
                        />
                    }
                    actions={
                        <OkCancel
                            progress={progress}
                            okClick={() => deleteImage()}
                            cancelClick={() => setDeletionOpen(false)}
                        />
                    }
                />
            </DialogContext.Provider>
        }
        <span className="group" onClick={() => setUploadOpen(true)}>
            <img src={url} alt={alt || ''} className={(hasMoreRoom ? "w-12 h-12" : "w-8 h-8 ") + " object-cover rounded-full " + (uploadUrl && "cursor-pointer group-hover:shadow-md group-hover:shadow-black transition-all")} />
            {
                hasImage &&
                <div
                    className="absolute w-8 h-8 top-0 right-0 bottom-0 left-0 opacity-0 transition-all cursor-pointer m-auto group-hover:opacity-100 group-hover:-left-16 hover:fill-red-400 grid place-items-center"
                    onClick={showDeletion}
                >
                    <HolismIcon
                        icon={DeleteIcon}
                        className="hover:fill-red-400"
                    />
                </div>
            }
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