"use client"

import React, { useState } from "react";
import Image from "next/image";
// import { photos } from "./photo";
import Gallery, { PhotoClickHandler } from "react-photo-gallery";
import { X } from "lucide-react";

interface HomeProps {
  photos: { src: string; width: number; height: number }[];
}

const Home: React.FC<HomeProps> = ({ photos }) => {
  const [currentImage, setCurrentImage] = useState<number | null>(null);

  const openLightbox: PhotoClickHandler<{}> = (event, obj) => {
    setCurrentImage(obj.index);
  };

  const closeLightbox = () => {
    setCurrentImage(null);
  };

  return (
    <div>
      <Gallery photos={photos} onClick={openLightbox} />
      {currentImage !== null && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
          <div className="relative w-full h-full">
            <Image
              src={photos[currentImage].src}
              alt="{photos[currentImage].title}"
              layout="fill" // Set layout to fill for full-width display
              objectFit="contain"
               loading="lazy"
            />
            <button
              className="absolute top-0 right-0 p-4 text-white"
              onClick={closeLightbox}
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;