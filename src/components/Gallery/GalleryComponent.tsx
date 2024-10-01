'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Plus, Image as ImageIcon, X } from 'lucide-react'
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
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null)
  const [newPhotos, setNewPhotos] = useState<File[]>([])
  const [newPhotosPreviews, setNewPhotosPreviews] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const createNewGallery = async () => {
    if (newGalleryName.trim() === "") {
      toast({ title: "Error", description: "Gallery name cannot be empty.", variant: "destructive" })
      return
    }

    if (galleries.some(gallery => gallery.name === newGalleryName)) {
      toast({ title: "Error", description: "A gallery with this name already exists.", variant: "destructive" })
      return
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


    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('name', newGalleryName)
      formData.append('category', newCategory)
      newPhotos.forEach(file => formData.append("photos", file))
  
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

  const handleDeletePhotos = async (gallery: Gallery, deletedPhotos: string[]) => {
    if (deletedPhotos.length === 0) return

    try {
      setLoading(true)
      await axios.patch(
        `http://localhost:8000/api/${category}/photos/${categoryId}/folder/${gallery._id}/delete`,
        { photos: deletedPhotos },
        getConfig()
      )
      setGalleries(galleries.map(g =>
        g._id === gallery._id
          ? { ...g, photos: g.photos.filter(photo => !deletedPhotos.includes(photo)) }
          : g
      ))
      toast({ title: "Success", description: "Photos deleted successfully." })
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete photos.", variant: "destructive" })
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
        {galleries.map((gallery) => (
          <div key={gallery._id} className="border rounded-lg p-4">
            {/* <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">{gallery.name}</h2>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">
                    <ImageIcon className="mr-2 h-4 w-4" /> Add Images
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Add Images to {gallery.name}</AlertDialogTitle>
                    <AlertDialogDescription>
                      Select images to add to this gallery.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <Input
                    type="file"
                    onChange={handleFileSelect}
                    multiple
                    accept="image/*"
                    className="mb-4"
                  />
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {newPhotosPreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <Image src={preview} alt="Preview" className="w-full h-24 object-cover rounded" />
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
                    <AlertDialogAction onClick={() => uploadPhotosToGallery(gallery._id)} disabled={loading}>
                      {loading ? 'Uploading...' : 'Upload Images'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div> */}
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
            <ImageContainer
              initialData={[gallery]}
              categoryId={categoryId}
              category={category}
              onDeleteImages={(deletedImages) => handleDeletePhotos(gallery, deletedImages)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default GalleryComponent