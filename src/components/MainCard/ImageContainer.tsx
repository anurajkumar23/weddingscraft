"use client"

import Image, { StaticImageData } from 'next/image';
import React, { useState } from 'react';
import ImageBox from '../banquet/ImageBox';


interface ImageProps{
    photos: string[];
    alt: string;
    title: string;
    number:string|number
}


const ImageContainer: React.FC<ImageProps> = ({ photos, alt, title, number }) => {
  const [showModal, setShowModal] = useState(false);
  const handleJoinUsClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  

  return (
    <div className='mb-6'>
      <button onClick={handleJoinUsClick}>
      <Image
        src={`${process.env.NEXT_PUBLIC_Backend_Url_Image}images/banquet/media/${photos[0]}`}
        alt={alt}
        width={800} // Set the width of the image
        height={600} // Set the height of the image
        className=' object-cover md:w-44 md:h-44  cursor-pointer rounded-2xl'
        loading='lazy'
      />
       
      </button>
      <div className=" mt-3">
      <div className='flex'>
      <strong className='font-medium md:text-lg text-base'>{title}</strong>
      </div>
      <p>{number} {title === 'Photos' ? `${title}/video` : title}</p>
      </div>
      {showModal && <ImageBox onClose={handleCloseModal} photos={photos}/>}
    </div>
  );
};

export default ImageContainer;
