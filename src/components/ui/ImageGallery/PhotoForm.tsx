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
}

interface PhotoFormProps {
  initialData: Gallery[];
  categoryId: string;
  category: string;
}

const PhotoForm: React.FC<PhotoFormProps> = ({ initialData, categoryId, category }) => {
  const [galleries, setGalleries] = useState<Gallery[]>(initialData);
  const [newGalleryName, setNewGalleryName] = useState("");
  const [selectedGallery, setSelectedGallery] = useState<string | null>(null);
  const [newPhotos, setNewPhotos] = useState<File[]>([]);
  const [newPhotosPreviews, setNewPhotosPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleDeletePhotos = async (galleryName: string, deletedPhotos: string[]) => {
    if (deletedPhotos.length === 0) return;

    const token = localStorage.getItem("jwt_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      setLoading(true);
      await axios.patch(
        `http://localhost:8000/api/${category}/photos/${categoryId}/delete`,
        { galleryName, photos: deletedPhotos },
        config
      );
      setGalleries(galleries.map(gallery => 
        gallery.name === galleryName 
          ? { ...gallery, photos: gallery.photos.filter(photo => !deletedPhotos.includes(photo)) }
          : gallery
      ));
      toast.success("Photos deleted successfully.");
    } catch (error: any) {
      toast.error("Failed to delete photos.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFileList = Array.from(files);
      setNewPhotos((prevPhotos) => [...prevPhotos, ...newFileList]);
      setNewPhotosPreviews((prevPreviews) => [
        ...prevPreviews,
        ...newFileList.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const removeFile = (index: number) => {
    setNewPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
    setNewPhotosPreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  const onPhotoSubmit = async () => {
    if (!selectedGallery) {
      toast.error("Please select a gallery before uploading photos.");
      return;
    }

    if (newPhotos.length === 0) {
      toast.error("Please select photos to upload.");
      return;
    }

    const token = localStorage.getItem("jwt_token");
    const formData = new FormData();
    formData.append("galleryName", selectedGallery);
    newPhotos.forEach((file) => {
      formData.append("photos", file);
    });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      setLoading(true);
      const response = await axios.patch(
        `http://localhost:8000/api/${category}/photos/${categoryId}`,
        formData,
        config
      );
      setGalleries(galleries.map(gallery => 
        gallery.name === selectedGallery 
          ? { ...gallery, photos: [...gallery.photos, ...response.data.newPhotos] }
          : gallery
      ));
      setNewPhotos([]);
      setNewPhotosPreviews([]);
      (document.getElementById("photo-input") as HTMLInputElement).value = "";
      toast.success("Photos uploaded successfully.");
    } catch (error: any) {
      toast.error("Failed to upload photos.");
    } finally {
      setLoading(false);
    }
  };

  const addNewGallery = () => {
    if (newGalleryName.trim() === "") {
      toast.error("Gallery name cannot be empty.");
      return;
    }
    if (galleries.some(gallery => gallery.name === newGalleryName)) {
      toast.error("A gallery with this name already exists.");
      return;
    }
    setGalleries([...galleries, { name: newGalleryName, photos: [] }]);
    setNewGalleryName("");
    toast.success("New gallery added successfully.");
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
              onChange={(e) => setNewGalleryName(e.target.value)}
              placeholder="Gallery Name"
            />
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={addNewGallery}>Add Gallery</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {galleries.map((gallery) => (
        <div key={gallery.name} className="mb-8">
          <h3 className="text-xl font-semibold mb-2">{gallery.name}</h3>
          <div className="grid grid-cols-4 gap-4">
            {gallery.photos.map((photo, index) => (
              <div key={index} className="relative">
                <Image
                  src={photo}
                  alt={`Gallery photo ${index}`}
                  width={200}
                  height={200}
                  className="object-cover rounded-lg cursor-pointer"
                  onClick={() => setPreviewImage(photo)}
                />
              </div>
            ))}
          </div>
          <GalleryImage
            photos={gallery.photos}
            category={category}
            handleDeletedPhotos={(deletedPhotos) => handleDeletePhotos(gallery.name, deletedPhotos)}
          />
        </div>
      ))}

      <div className="mt-8 space-x-2">
        <h3 className="text-xl font-semibold mb-2">Add New Photos</h3>
        <select
          className="mb-4 p-2 border rounded"
          value={selectedGallery || ""}
          onChange={(e) => setSelectedGallery(e.target.value)}
        >
          <option value="">Select a gallery</option>
          {galleries.map((gallery) => (
            <option key={gallery.name} value={gallery.name}>
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
                    width={200}
                    height={200}
                    src={preview}
                    alt={`Preview ${index}`}
                    className="object-cover rounded-lg cursor-pointer"
                    onClick={() => setPreviewImage(preview)}
                  />
                  <Button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 p-1"
                    variant="destructive"
                    size="icon"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        <Button
          type="button"
          onClick={onPhotoSubmit}
          disabled={loading || newPhotos.length === 0 || !selectedGallery}
        >
          {loading ? "Uploading..." : "Submit Photos"}
        </Button>
      </div>

      <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="relative">
            {previewImage && (
              <Image
                src={previewImage}
                alt="Preview"
                width={400}
                height={400}
                className="object-contain"
              />
            )}
            <DialogClose className="absolute top-2 right-2">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PhotoForm;