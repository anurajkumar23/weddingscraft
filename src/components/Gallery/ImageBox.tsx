"use client";

import React, { useState } from "react";
import GalleryImage from "./Gallary";
import { toast } from '@/hooks/use-toast'
import axios from "axios";

interface JoinUsFormProps {
  onClose: () => void;
  photos: string[];
  category: string;
  folderId:string;
  categoryId:string;

}

const JoinUsForm: React.FC<JoinUsFormProps> = ({
  onClose,
  photos,
  category,
  folderId,
  categoryId,

}) => {
  const [newImages, setNewImages] = useState<File[]>([]); // For new image files
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]); // Previews for new images
  const [deletedImages, setDeletedImages] = useState<string[]>([]); // For deleted image names from existing photos

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setNewImages((prevImages) => [...prevImages, ...files]); // Add files to newImages array
      const previews = files.map((file) => URL.createObjectURL(file)); // Generate preview URLs
      setNewImagePreviews((prevPreviews) => [...prevPreviews, ...previews]); // Add preview URLs
    }
  };

  // Remove new image from the preview and newImages array
  const removeNewImage = (index: number) => {
    const updatedNewImages = [...newImages];
    const updatedPreviews = [...newImagePreviews];

    updatedNewImages.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setNewImages(updatedNewImages);
    setNewImagePreviews(updatedPreviews);
  };

  // Handle deletion of existing photos (add to deletedImages array)
  const handleDeletedPhotos = (photo: string) => {
    setDeletedImages((prev) => [...prev, photo]);
    console.log("Deleted photo:", photo);
  };
  const getConfig = () => {
    const token = localStorage.getItem("jwt_token")
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  }
  const handleUpdate = async () => {
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



    console.log("Update Triggered");
    console.log("Deleted Images:", deletedImages);
    console.log("New Images:", newImages);
    console.log("newCategory",newCategory)
    console.log("category",category)
    console.log("categotry id",categoryId)
    console.log("folderid",folderId)
    const formData = new FormData();

    // Append deleted images to formData
    deletedImages.forEach(image => {
      formData.append("deleteImageArray", image);
    });
    
    formData.append('category', newCategory)

    // Append new images to formData
    newImages.forEach(file => formData.append("addImagesArray[]", file))

    try {
      // setLoading(true)
      const response = await axios.patch(
        `http://localhost:8000/api/${category}/${categoryId}/folder/${folderId}`,
        formData,
        getConfig()
      )

      console.log(response.data,"response")
    
      toast({ title: "Success", description: "Update successfully." })
    } catch (error) {
      toast({ title: "Error", description: "Failed to Update.", variant: "destructive" })
    } finally {
      // setLoading(false)
    }
   
  };

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

        

        {/* File Input for new photos */}
        <div className="mt-4">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="mb-4"
          />

          {/* New Photos Previews */}
          <div className="grid grid-cols-3 gap-2">
            {newImagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt="New Preview"
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

        {/* Deleted images state for tracking */}
        <div className="mt-4">
          <strong>Deleted Images:</strong>
          <ul>
            {deletedImages.map((img, index) => (
              <li key={index}>{img}</li>
            ))}
          </ul>
        </div>
      <div className="mt-4">
          Display existing gallery photos
          <GalleryImage
            photos={photos}
            category={category}
            handleDeletedPhotos={handleDeletedPhotos}
            handleUpdate={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default JoinUsForm;
