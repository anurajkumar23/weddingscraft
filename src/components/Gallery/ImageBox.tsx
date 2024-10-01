'use client'

import React from 'react'
import GalleryImage from './Gallary';


interface JoinUsFormProps {
  onClose: () => void
  photos: string[]
  category: string;
}

const JoinUsForm: React.FC<JoinUsFormProps> = ({ onClose, photos, category }) => {
  const handleDeletedPhotos = (newPhotos: string[]) => {
    console.log('Deleted photos:', newPhotos)
    // Here you would typically update the parent component's state or make an API call
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg p-8 max-w-6xl w-full h-[90vh] relative overflow-auto">
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
          <GalleryImage
            photos={photos}
            category={category}
            handleDeletedPhotos={handleDeletedPhotos}
          />
        </div>
      </div>
    </div>
  )
}

export default JoinUsForm