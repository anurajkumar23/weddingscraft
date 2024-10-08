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
        "Content-Type": "multipart/form-data",
      },
    }
  }, [])

  const handleUpdate = async (deletedImages: string[], newImages: File[]) => {
    let newCategoryName = ''
    if (category === 'banquet') {
      newCategoryName = 'Banquet'
    } else if (category === 'caterer') {
      newCategoryName = 'Caterer'
    } else if (category === 'decor') {
      newCategoryName = 'Decorator'
    } else if (category === 'photographer') {
      newCategoryName = 'Photographer'
    } else {
      newCategoryName = 'Banquet'
    }

    const formData = new FormData()

    deletedImages.forEach(image => {
      formData.append("deleteImageArray[]", image)
    })

    formData.append('category', newCategoryName)

    newImages.forEach(file => formData.append("addImagesArray[]", file))

    try {
      const response = await axios.patch(
        `http://localhost:8000/api/${category}/${categoryId}/folder/${folderId}`,
        formData,
        getConfig()
      )
      
      const updatedGallery = response?.data?.data?.[category]?.gallery;
    
      if (updatedGallery && Array.isArray(updatedGallery)) {
        const specificGallery = updatedGallery.find((item) => item._id === folderId);
        const updatedPhotos = specificGallery?.photos || [];

        // console.log(updatedPhotos, "👆👆👆 Updated Photos 😀");

        setGallery(prevGallery => ({
          ...prevGallery,
          photos: updatedPhotos
        }))
        setPreviewImages(updatedPhotos)

        toast({
          title: 'Update successful',
          description: 'The gallery has been successfully updated.',
        })

        return updatedPhotos
      } else {
        throw new Error('Gallery data not found in response')
      }
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
    <div className="w-full p-4 overflow-hidden">
      <div className="max-w-44">
        <div className="relative group">
          <AlertDialog open={showModal} onOpenChange={setShowModal}>
            <AlertDialogTrigger asChild>
              <button onClick={handleOpenModal}>
                <Image
                  src={gallery?.photos[0] || '/placeholder.svg'}
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
                handleUpdate={handleUpdate}
              />
            </AlertDialogContent>
          </AlertDialog>
          <div className="justify-between items-center mt-2">
            <strong className="text-lg font-semibold">{gallery.name}</strong>
            <p className="text-gray-500 text-sm">{gallery.photos.length} Photos/Videos</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageContainer