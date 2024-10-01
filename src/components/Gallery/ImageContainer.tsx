'use client'

import React, { useState } from 'react'
import Image from 'next/image'
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
  folderId:string
  newCategory:string
  // setDeleteImages: (x: string[]) => void
  // setNewPhotos:(x:File[])=>void
}

const ImageContainer: React.FC<ImageProps> = ({ initialData, categoryId,folderId, category,newCategory }) => {
  const [showModal, setShowModal] = useState(false)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [gallery] = initialData
  // const [newPhotos, setNewPhotos] = useState<File[]>([])
  // const [deleteImages,setDeleteImages]=useState<string[]>([])

  const handleOpenModal = () => {
    setPreviewImages(gallery.photos) 
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div className="w-full p-4">
      <div className="max-w-44 ">
        <div className="relative group">
          <button onClick={handleOpenModal}>
            <Image
              src={gallery.photos[0]}
              alt={`${category} photo`}
              width={800}
              height={600}
              className="w-full h-44 object-cover rounded-2xl transition-transform duration-300 ease-in-out transform group-hover:scale-105"
            />
          </button>
          <div className="justify-between items-center">
            
            <strong className="text-lg font-semibold">{gallery.name}</strong>
            <p className="text-gray-500 text-sm">{gallery.photos.length} Photos/Videos</p>
          </div>
        </div>
      </div>

      {/* Modal for image preview */}
      {showModal && (
        <ImageBox onClose={handleCloseModal} photos={previewImages} category={category}  folderId={folderId} categoryId={categoryId} />
      )}
    </div>
  )
}

export default ImageContainer
