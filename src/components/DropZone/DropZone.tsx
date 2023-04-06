import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface DropzoneTypes {
  handleImageChange: (files: File[]) => void
}

function DropZone({ handleImageChange }: DropzoneTypes) {
  const [files, setFiles] = useState([])

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      )
      handleImageChange(acceptedFiles)
    },
    [handleImageChange],
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  })

  const thumbs = files.map((file: any) => (
    <div
      key={file.name}
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '8px',
      }}
    >
      <Image
        alt=""
        src={file.preview}
        onLoad={() => {
          URL.revokeObjectURL(file.preview)
        }}
        width={300}
        height={300}
      />
    </div>
  ))

  return (
    <>
      <label
        {...getRootProps()}
        className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
      >
        <span className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <span className="font-medium text-gray-600">
            Suelta la imagen aqui
          </span>
        </span>

        <input {...getInputProps()} className="hidden" />
      </label>
      {thumbs}
    </>
  )
}

export default DropZone
