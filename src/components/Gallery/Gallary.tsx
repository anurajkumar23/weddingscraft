'use client'

import React, { useState, useCallback } from "react"
import Image from "next/image"
import { X } from "lucide-react"

interface GalleryImageProps {
  photos: string[]
  category: string
  handleDeletedPhotos: (deletedPhotos: string[] ) => void
  handleUpdate: () => void
}

const GalleryImage: React.FC<GalleryImageProps> = ({ photos, category, handleDeletedPhotos, handleUpdate }) => {
  const [currentImage, setCurrentImage] = useState<number | null>(null)
  const [localPhotos, setLocalPhotos] = useState<string[]>(photos) // Manage the local state of photos
  const [deletePhotoIndex, setDeletePhotoIndex] = useState<string[]>([]) // Track deleted photos

  // Open the lightbox view for a specific image
  const openLightbox = useCallback((index: number) => {
    setCurrentImage(index)
  }, [])

  // Close the lightbox view
  const closeLightbox = useCallback(() => {
    setCurrentImage(null)
  }, [])

  // Remove image from localPhotos and add it to the deleted list
  const removeImage = (index: number, imageUrl: string) => {
    const updatedPhotos = localPhotos.filter((_, idx) => idx !== index)
    setLocalPhotos(updatedPhotos)
    setDeletePhotoIndex((prev) => [...prev, imageUrl]) // Add to deleted photo list
    handleDeletedPhotos(imageUrl) // Send deleted photos to the parent
  }

  // Generate correct image URL
  const getImageUrl = (imageUrl: string) => {
    if (imageUrl.startsWith('blob:') || imageUrl.startsWith('http:') || imageUrl.startsWith('https:')) {
      return imageUrl
    }
    return `/images/${category}/media/${imageUrl}`
  }

  // Call the parent's handleUpdate and handleDeletedPhotos
  const handleUpdateClick = () => {
    handleUpdate() // Call the parent update handler
  }

  return (
    <div>
      <section id="photos">
        <div className="columns-2 gap-4 sm:columns-3 md:columns-4">
          {localPhotos.map((imageUrl, idx) => (
            <div key={idx} className="relative mb-4 break-inside-avoid">
              <Image
                className="w-full rounded-lg object-cover cursor-pointer"
                src={getImageUrl(imageUrl)}
                alt={`media photo-${idx}`}
                width={500}
                height={500}
                onClick={() => openLightbox(idx)}
                loading="lazy"
              />
              <button
                className="absolute top-2 right-2 p-1 text-white bg-red-600 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                onClick={() => removeImage(idx, imageUrl)}
                aria-label="Remove image"
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>
      </section>
      {currentImage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full h-full max-w-4xl max-h-4xl">
            <Image
              src={getImageUrl(localPhotos[currentImage])}
              alt={`Photo ${currentImage}`}
              layout="fill"
              objectFit="contain"
              loading="lazy"
            />
            <button
              className="absolute top-4 right-4 p-2 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
      <div className="mt-6 text-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={handleUpdateClick}
        >
          Update
        </button>
      </div>
    </div>
  )
}

export default GalleryImage
