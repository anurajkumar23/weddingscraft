'use client'

import React, { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface GalleryImageProps {
  photos: string[]
  category: string
  handleUpdate: (deletedImages: string[]) => Promise<string[]>
}

const GalleryImage: React.FC<GalleryImageProps> = ({ 
  photos, 
  category, 
  handleUpdate,
}) => {
  const [currentImage, setCurrentImage] = useState<number | null>(null)
  const [localPhotos, setLocalPhotos] = useState<string[]>(photos)
  const [deletedImages, setDeletedImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setLocalPhotos(photos)
  }, [photos])

  const openLightbox = useCallback((index: number) => {
    setCurrentImage(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setCurrentImage(null)
  }, [])

  const markImageForDeletion = (index: number, imageUrl: string) => {
    setDeletedImages((prevDeleted) => [...prevDeleted, imageUrl])
    setLocalPhotos((prevPhotos) => prevPhotos.filter((_, idx) => idx !== index))

    toast({
      title: "Image marked for deletion",
      description: "The image will be deleted when you click 'Update'.",
    })
  }

  const getImageUrl = (imageUrl: string) => {
    if (imageUrl.startsWith('blob:') || imageUrl.startsWith('http:') || imageUrl.startsWith('https:')) {
      return imageUrl
    }
    return `/${category}/${imageUrl}`
  }

  const handleUpdateClick = async () => {
    setIsLoading(true)
    try {
      const updatedPhotos = await handleUpdate(deletedImages)
      setLocalPhotos(updatedPhotos)
      setDeletedImages([]) // Clear the deleted images after update

      toast({
        title: "Update successful",
        description: "The gallery has been successfully updated.",
      })
    } catch (error) {
      console.error("Failed to update gallery:", error)
      toast({
        title: "Error",
        description: "Failed to update the gallery. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    if (currentImage === null) return
    const newIndex = direction === 'prev' 
      ? (currentImage - 1 + localPhotos.length) % localPhotos.length
      : (currentImage + 1) % localPhotos.length
    setCurrentImage(newIndex)
  }

  return (
    <div className="space-y-6">
      <section id="photos" className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {localPhotos.map((imageUrl, idx) => (
            <div key={idx} className="relative group">
              <Image
                className="w-full h-48 rounded-lg object-cover cursor-pointer transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                src={getImageUrl(imageUrl)}
                alt={`media photo-${idx}`}
                width={500}
                height={500}
                onClick={() => openLightbox(idx)}
                loading="lazy"
              />
              <button
                className="absolute top-2 right-2 p-1 text-white bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                onClick={() => markImageForDeletion(idx, imageUrl)}
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
            <button
              className="absolute top-1/2 left-4 p-2 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              onClick={() => navigateImage('prev')}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="absolute top-1/2 right-4 p-2 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              onClick={() => navigateImage('next')}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-center space-x-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center"
          onClick={handleUpdateClick}
          disabled={isLoading}
        >
          <RefreshCw size={20} className="mr-2" />
          {isLoading ? 'Updating...' : 'Update'}
        </button>
      </div>
    </div>
  )
}

export default GalleryImage