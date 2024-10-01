"use client";

import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { Trash, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
} from "@/components/model/gallery-alert-model";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import GalleryImage from "@/components/Gallery/Gallary";

interface Gallery {
  name: string;
  photos: string[];
  _id: string; // Include folder ID
}

interface PhotoFormProps {
  initialData: Gallery[];
  categoryId: string;
  category: string;
}

const PhotoForm: React.FC<PhotoFormProps> = ({ initialData, categoryId, category }) => {
  const [galleries, setGalleries] = useState<Gallery[]>(initialData);
  const [newGalleryName, setNewGalleryName] = useState("");
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const [newPhotos, setNewPhotos] = useState<File[]>([]);
  const [newPhotosPreviews, setNewPhotosPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const token = localStorage.getItem("jwt_token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const handleDeletePhotos = async (gallery: Gallery, deletedPhotos: string[]) => {
    if (deletedPhotos.length === 0) return;

    try {
      setLoading(true);
      await axios.patch(
        `http://localhost:8000/api/${category}/photos/${categoryId}/folder/${gallery._id}/delete`,
        { photos: deletedPhotos },
        config
      );
      setGalleries(galleries.map(g =>
        g._id === gallery._id
          ? { ...g, photos: g.photos.filter(photo => !deletedPhotos.includes(photo)) }
          : g
      ));
      toast.success("Photos deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete photos.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFileList = Array.from(files);
      setNewPhotos(prevPhotos => [...prevPhotos, ...newFileList]);
      setNewPhotosPreviews(prevPreviews => [
        ...prevPreviews,
        ...newFileList.map(file => URL.createObjectURL(file)),
      ]);
    }
  };

  const removeFile = (index: number) => {
    setNewPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index));
    setNewPhotosPreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
  };

  const createNewGallery = async () => {
    if (newGalleryName.trim() === "") {
      toast.error("Gallery name cannot be empty.");
      return;
    }

    if (galleries.some(gallery => gallery.name === newGalleryName)) {
      toast.error("A gallery with this name already exists.");
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:8000/api/${category}/${categoryId}/newfolder`,
        { galleryName: newGalleryName },
        config
      );
      const newGallery = response.data;
      setGalleries([...galleries, newGallery]);
      setNewGalleryName("");
      toast.success("New gallery added successfully.");
    } catch (error) {
      toast.error("Failed to create gallery.");
    }
  };

  const uploadPhotosToGallery = async () => {
    if (!selectedGallery) {
      toast.error("Please select a gallery before uploading photos.");
      return;
    }

    if (newPhotos.length === 0) {
      toast.error("Please select photos to upload.");
      return;
    }

    const formData = new FormData();
    newPhotos.forEach(file => formData.append("photos", file));

    try {
      setLoading(true);
      const response = await axios.patch(
        `http://localhost:8000/api/${category}/${categoryId}/folder/${selectedGallery._id}`,
        formData,
        config
      );
      setGalleries(galleries.map(g =>
        g._id === selectedGallery._id
          ? { ...g, photos: [...g.photos, ...response.data.newPhotos] }
          : g
      ));
      resetPhotoUploadForm();
      toast.success("Photos uploaded successfully.");
    } catch (error) {
      toast.error("Failed to upload photos.");
    } finally {
      setLoading(false);
    }
  };

  const resetPhotoUploadForm = () => {
    setNewPhotos([]);
    setNewPhotosPreviews([]);
    (document.getElementById("photo-input") as HTMLInputElement).value = "";
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Photo Galleries</h2>
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
                Enter a name for the new gallery.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Input
              value={newGalleryName}
              onChange={e => setNewGalleryName(e.target.value)}
              placeholder="Gallery Name"
            />
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={createNewGallery}>
                Add Gallery
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {galleries.map(gallery => (
        <div key={gallery._id} className="mb-8">
          <h3 className="text-xl font-semibold mb-2">{gallery.name}</h3>
          <div className="grid grid-cols-4 gap-4">
            {gallery.photos.map((photo, index) => (
              <div key={index} className="relative group">
                <Image
                  src={photo}
                  alt={`Gallery photo ${index}`}
                  width={500}
                  height={500}
                  className="object-cover rounded-lg cursor-pointer"
                  onClick={() => setPreviewImage(photo)}
                />
                <div className="">
                  <Button
                    type="button"
                    onClick={() => handleDeletePhotos(gallery, [photo])}
                    className="p-1"
                    variant="destructive"
                    size="icon"
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Delete photo</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-8 space-x-2">
        <h3 className="text-xl font-semibold mb-2">Add New Photos</h3>
        <select
          className="mb-4 p-2 border rounded"
          value={selectedGallery?._id || ""}
          onChange={e => setSelectedGallery(galleries.find(g => g._id === e.target.value) || null)}
        >
          <option value="">Select a gallery</option>
          {galleries.map(gallery => (
            <option key={gallery._id} value={gallery._id}>
              {gallery.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          id="photo-input"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="mb-4"
        />
        {newPhotosPreviews.length > 0 && (
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2">New Photos Preview</h4>
            <div className="grid grid-cols-4 gap-4">
              {newPhotosPreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <Image
                    width={500}
                    height={500}
                    src={preview}
                    alt={`Preview ${index}`}
                    className="object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-2 right-2 p-1"
                    variant="destructive"
                    size="icon"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        <Button
          onClick={uploadPhotosToGallery}
          disabled={loading}
          className="mr-2"
          variant="default"
        >
          {loading ? "Uploading..." : "Upload Photos"}
        </Button>
      </div>

      <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
      <DialogContent className="fixed inset-0 z-50 flex justify-center items-center">
        <div className="relative">
          {previewImage && (
            <Image
              src={previewImage}
              alt="Preview"
              width={500}
              height={500}
              loading="lazy"
              className="object-contain"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
    </div>
  );
};

export default PhotoForm;
