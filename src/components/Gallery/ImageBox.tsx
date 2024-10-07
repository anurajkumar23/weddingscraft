'use client'

import React, { useState } from "react"
import { useToast } from '@/hooks/use-toast'
import Image from "next/image"
import GalleryImage from "./Gallary"


interface ImageBoxProps {
  onClose: () => void
  photos: string[]
  category: string
  handleUpdate: (deletedImages: string[], newImages: File[]) => Promise<string[]>
}

const ImageBox: React.FC<ImageBoxProps> = ({
  onClose,
  photos: initialPhotos,
  category,
  handleUpdate
}) => {
  const [newImages, setNewImages] = useState<File[]>([])
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([])
  const [currentPhotos, setCurrentPhotos] = useState<string[]>(initialPhotos)
  const { toast } = useToast()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setNewImages((prevImages) => [...prevImages, ...files])
      const previews = files.map((file) => URL.createObjectURL(file))
      setNewImagePreviews((prevPreviews) => [...prevPreviews, ...previews])
    }
  }

  const removeNewImage = (index: number) => {
    const updatedNewImages = [...newImages]
    const updatedPreviews = [...newImagePreviews]

    updatedNewImages.splice(index, 1)
    updatedPreviews.splice(index, 1)

    setNewImages(updatedNewImages)
    setNewImagePreviews(updatedPreviews)
  }

  const handleUpdateGallery = async (deletedImages: string[]) => {
    try {
      const updatedPhotos = await handleUpdate(deletedImages, newImages)
      setCurrentPhotos(updatedPhotos)
      setNewImages([])
      setNewImagePreviews([])
      return updatedPhotos
    } catch (error) {
      console.error('Failed to update:', error)
      toast({
        title: 'Error',
        description: 'Failed to update the gallery. Please try again.',
        variant: 'destructive',
      })
      throw error
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg p-8 max-w-6xl max-h-6xl h-full w-full relative overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h1 className="text-center pb-4 font-bold text-xl">Photos/Video</h1>

        <div className="mt-4">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="mb-4"
          />

          <div className="grid grid-cols-3 gap-2">
            {newImagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <Image
                  src={preview}
                  alt="New Preview"
                  width={500}
                  height={500}
                  className="object-cover rounded"
                />
                <button
                  onClick={() => removeNewImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <GalleryImage
            photos={currentPhotos}
            category={category}
            handleUpdate={handleUpdateGallery}
          />
        </div>
      </div>
    </div>
  )
}

export default ImageBox