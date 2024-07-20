"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface HomeProps {
  photos: { src: string; width: number; height: number }[];
}

const Home: React.FC<HomeProps> = ({ photos }) => {
  const [currentImage, setCurrentImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setCurrentImage(index);
  };

  const closeLightbox = () => {
    setCurrentImage(null);
  };

  return (
    <div>
      <section id="photos">
        <div className="columns-2 gap-1 sm:columns-3">
          {photos.map((photo, idx) => (
            <Image
              key={idx}
              className="mb-4 size-full rounded-lg object-contain cursor-pointer"
              src={photo.src}
              alt=""
              width={500}
              height={500}
              onClick={() => openLightbox(idx)}
              loading="lazy"
            />
          ))}
        </div>
      </section>
      {currentImage !== null && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
          <div className="relative w-full h-full">
            <Image
              src={photos[currentImage].src}
              alt={`Photo ${currentImage}`}
              layout="fill"
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
};

export default Home;
