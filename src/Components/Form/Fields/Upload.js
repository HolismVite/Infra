import React, { useState, useEffect, useCallback, useContext } from 'react'
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDropzone } from 'react-dropzone'
import Fade from '@mui/material/Fade';
import { app, Field, FormContext } from '@Form';
import { fieldStyles } from './FieldStyle'

const Upload = ({
    multiple
}) => {
    const [files, setFiles] = useState([])
    const [previews, setPreviews] = useState([])
    const [hasImages, setHasImages] = useState(false)
    var { setHasFile } = useContext(FormContext) || { setHasFile: () => { } };

    useEffect(() => {
        setHasFile(true)
    }, [])

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles)
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    useEffect(() => {
        app.selectedFiles = files
        setPreviews(files.map(file => {
            return {
                name: file.name,
                url: URL.createObjectURL(file)
            }
        }))
        return () => previews.map(preview => URL.revokeObjectURL(preview.url))
    }, [files])

    useEffect(() => {
        setHasImages(previews.length > 0)
    }, [previews])

    const removeImage = (e, preview) => {
        setFiles(files.filter(i => i.name != preview.name))
        e.stopPropagation()
    }

    return <div
        className={fieldStyles + (previews.length === 0 ? " relative bg-slate-100 flex justify-center items-center py-20 cursor-pointer group hover:bg-slate-200 border-dashed border-2 border-slate-400 hover:border-slate-600 " : "")}
        {...getRootProps()}
    >
        <Fade in={hasImages}>
            <div className="relative flex items-center justify-around">
                {
                    previews.map(preview => <div className="relative" key={preview.url}>
                        <img
                            className="rounded-lg shadow-md shadow-black w-36 h-36 object-cover "
                            src={preview.url}
                        />
                        <IconButton
                            className="absolute -top-4 -right-4 "
                            aria-label="delete"
                            onClick={(e) => removeImage(e, preview)}
                        >
                            <CancelIcon />
                        </IconButton>
                    </div>)
                }
            </div>
        </Fade>
        <Fade in={!hasImages}>
            <div>
                {
                    isDragActive && <div className="absolute inset-0 bg-green-500 animate-pulse"></div>
                }
                <input {...getInputProps({
                    multiple: multiple
                })} />
                <p className="relative text-sm tracking-wide font-bold text-slate-600 group-hover:drop-shadow group-hover:drop-shadow">
                    {
                        isDragActive ?
                            <span>Drop the {multiple ? "files" : "file"} here ...</span> :
                            <span>Drag &amp; drop {multiple ? "some files" : "a file"} here, or click to select {multiple ? "files" : "a file"}</span>
                    }
                </p>
            </div>
        </Fade>
    </div>
}

export { Upload }