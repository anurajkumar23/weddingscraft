'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Plus, Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input'
import ImageContainer from './ImageContainer'
import { toast } from '@/hooks/use-toast'
import axios from 'axios'
import Image from 'next/image'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';


interface Gallery {
  _id: string
  name: string
  photos: string[]
}

interface ShowGallery {
  initialData: Gallery[]
  categoryId: string
  category: string
}

const GalleryComponent: React.FC<ShowGallery> = ({ initialData, categoryId, category }) => {
  const [galleries, setGalleries] = useState<Gallery[]>(initialData)
  const [newGalleryName, setNewGalleryName] = useState('')
  const [newPhotos, setNewPhotos] = useState<File[]>([])
  const [newPhotosPreviews, setNewPhotosPreviews] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const swiperRef = useRef<any>(null)



  useEffect(() => {
    return () => {
      newPhotosPreviews.forEach(URL.revokeObjectURL)
    }
  }, [newPhotosPreviews])

  const getConfig = () => {
    const token = localStorage.getItem("jwt_token")
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  }


  let newCategory = '';
  if (category === 'banquet') {
    newCategory = 'Banquet';
  } else if (category === 'caterer') {
    newCategory = 'Caterer';
  } else if (category === 'decor') {
    newCategory = 'Decorator';
  } else if (category === 'decor') {
    newCategory = 'Decorator';
  } else if (category === 'photographer') {
    newCategory = 'Photographer';
  } else {
    newCategory = 'Banquet';
  }


  const createNewGallery = async () => {
    if (newGalleryName.trim() === "") {
      toast({ title: "Error", description: "Gallery name cannot be empty.", variant: "destructive" })
      return
    }

    if (galleries.some(gallery => gallery.name === newGalleryName)) {
      toast({ title: "Error", description: "A gallery with this name already exists.", variant: "destructive" })
      return
    }




    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('name', newGalleryName)
      formData.append('category', newCategory)
      newPhotos.forEach(file => formData.append("photos[]", file))

      const response = await axios.patch(
        `http://localhost:8000/api/${category}/${categoryId}/newfolder`,
        formData,
        getConfig()
      )
      const newGallery = response.data
      setGalleries([...galleries, newGallery])
      setNewGalleryName("")
      resetPhotoUploadForm()
      toast({ title: "Success", description: "New gallery added successfully." })
    } catch (error) {
      toast({ title: "Error", description: "Failed to create gallery.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newFileList = Array.from(files)
      setNewPhotos(prevPhotos => [...prevPhotos, ...newFileList])
      setNewPhotosPreviews(prevPreviews => [
        ...prevPreviews,
        ...newFileList.map(file => URL.createObjectURL(file)),
      ])
    }
  }

  const removeFile = (index: number) => {
    setNewPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index))
    setNewPhotosPreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index))
  }

  const uploadPhotosToGallery = async (galleryId: string) => {
    if (newPhotos.length === 0) {
      toast({ title: "Error", description: "Please select photos to upload.", variant: "destructive" })
      return
    }

    const formData = new FormData()
    newPhotos.forEach(file => formData.append("photos", file))
    formData.append('category', category)

    try {
      setLoading(true)
      const response = await axios.patch(
        `http://localhost:8000/api/${category}/${categoryId}/folder/${galleryId}`,
        formData,
        getConfig()
      )
      setGalleries(galleries.map(g =>
        g._id === galleryId
          ? { ...g, photos: [...g.photos, ...response.data.newPhotos] }
          : g
      ))
      resetPhotoUploadForm()
      toast({ title: "Success", description: "Photos uploaded successfully." })
    } catch (error) {
      toast({ title: "Error", description: "Failed to upload photos.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }


  const resetPhotoUploadForm = () => {
    setNewPhotos([])
    setNewPhotosPreviews([])
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className="border w-full h-full rounded-sm bg-white py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium container">Photos</h1>

      </div>
      <div className="space-y-8">

        <div className="border rounded-lg p-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Add New Gallery
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Add New Gallery</AlertDialogTitle>
                <AlertDialogDescription>
                  Enter a name for the new gallery and select photos to upload.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Input
                value={newGalleryName}
                onChange={(e) => setNewGalleryName(e.target.value)}
                placeholder="Gallery Name"
                className="mb-4"
              />
              <Input
                type="file"
                onChange={handleFileSelect}
                multiple
                accept="image/*"
                className="mb-4"
              />
              <div className="grid grid-cols-3 gap-2 mb-4 overflow-y-auto">
                {newPhotosPreviews.map((preview, index) => (
                  <div key={index} className="relative ">
                    <Image src={preview} alt="Preview" width={500}
                      height={500} className="object-cover rounded" />
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={resetPhotoUploadForm}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={createNewGallery} disabled={loading}>
                  {loading ? 'Creating...' : 'Create Gallery'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div className="relative w-full">
            <Swiper
              modules={[Navigation]}
              slidesPerView="auto"
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper
              }}
  
            >
              {galleries.map((gallery) => (

                <SwiperSlide key={gallery._id} className="!w-auto">

                  <div className="max-w-44 md:w-64">
                    <ImageContainer
                      initialData={[gallery]}
                      categoryId={categoryId}
                      category={category}
                      folderId={gallery._id}
                      newCategory={newCategory}
                    />
                  </div>

                </SwiperSlide>

              ))}
            </Swiper>
            <button
              className="absolute top-1/2 left-0 z-10 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 shadow-md"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="absolute top-1/2 right-0 z-10 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 shadow-md"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GalleryComponent