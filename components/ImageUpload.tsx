"use client"

interface ImageUploadProps {
    onChange: (url: string) => void
    value: string
    endpoint: "postImage"
}
import { UploadDropzone } from '@/lib/uploadthings'
import { XIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function ImageUpload({ endpoint, onChange, value }: ImageUploadProps) {
    if (value) {
        return (
            <div className="relative size-40">
                <Image src={value} alt="Upload" className="rounded-md size-40 object-cover" height={500} width={500} />
                <button
                    onClick={() => onChange("")}
                    className="absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm"
                    type="button"
                >
                    <XIcon className="h-4 w-4 text-white" />
                </button>
            </div>
        )
    }
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url)
            }}
            onUploadError={(error: Error) => {
                console.log(error)
            }}
        />
    )
}

export default ImageUpload