"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface HomeProps {
  photos: string[] ;
  category:string;
}

const Home: React.FC<HomeProps> = ({ photos,category }) => {
  const [currentImage, setCurrentImage] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setCurrentImage(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setCurrentImage(null);
  }, []);

  return (
    <div>
      <section id="photos">
        <div className="columns-2 gap-1 sm:columns-3">
          {photos.map((photo, idx) => (
            <Image
              key={idx}
              className="mb-4 size-full rounded-lg object-contain cursor-pointer"
              src={`${process.env.NEXT_PUBLIC_Backend_Url_Image}images/${category}/media/${photo}`}
              alt={`media photo-${idx}`}
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
              src={`${process.env.NEXT_PUBLIC_Backend_Url_Image}images/${category}/media/${photos[currentImage]}`}
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

export default React.memo(Home);
