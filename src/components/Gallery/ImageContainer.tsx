'use client'

import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import { toast } from '@/hooks/use-toast'
import axios from 'axios'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import ImageBox from './ImageBox'

interface Gallery {
  _id: string
  name: string
  photos: string[]
}

interface ImageProps {
  initialData: Gallery[]
  categoryId: string
  category: string
  folderId: string
  newCategory: string
}

const ImageContainer: React.FC<ImageProps> = ({ initialData, categoryId, folderId, category, newCategory }) => {
  const [showModal, setShowModal] = useState(false)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [gallery, setGallery] = useState<Gallery>(initialData[0])

  const handleOpenModal = () => {
    setPreviewImages(gallery.photos)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const getConfig = useCallback(() => {
    const token = localStorage.getItem("jwt_token")
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  }, [])

  const handleDeleteImage = useCallback(async (imageToDelete: string) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/${category}/${categoryId}/folder/${folderId}`,
        {
          deleteImageArray: [imageToDelete],
          category: newCategory
        },
        getConfig()
      )

      if (response.status === 200) {
        setGallery(prevGallery => ({
          ...prevGallery,
          photos: prevGallery.photos.filter(photo => photo !== imageToDelete)
        }))
        setPreviewImages(prevImages => prevImages.filter(image => image !== imageToDelete))
        toast({ title: "Success", description: "Image deleted successfully." })
      } else {
        throw new Error("Failed to delete image")
      }
    } catch (error) {
      console.error('Error deleting image:', error)
      toast({ title: "Error", description: "Failed to delete image.", variant: "destructive" })
    }
  }, [category, categoryId, folderId, newCategory, getConfig])

  return (
    <div className="w-full p-4">
      <div className="max-w-44">
        <div className="relative group">
          <AlertDialog open={showModal} onOpenChange={setShowModal}>
            <AlertDialogTrigger asChild>
              <button onClick={handleOpenModal}>
                <Image
                  src={gallery.photos[0] || '/placeholder.jpg'}
                  alt={`${category} photo`}
                  width={800}
                  height={600}
                  className="w-full h-44 object-cover rounded-2xl transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-6xl max-h-[90vh] w-[90vw] p-0">
              <ImageBox 
                onClose={handleCloseModal} 
                photos={previewImages} 
                category={category} 
                folderId={folderId} 
                categoryId={categoryId}
                onDeleteImage={handleDeleteImage}
              />
            </AlertDialogContent>
          </AlertDialog>
          <div className="justify-between items-center">
            <strong className="text-lg font-semibold">{gallery.name}</strong>
            <p className="text-gray-500 text-sm">{gallery.photos.length} Photos/Videos</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageContainer