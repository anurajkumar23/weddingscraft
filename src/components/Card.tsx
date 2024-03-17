import { MapPin } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import React from 'react';


interface CardProps{
    img: string| StaticImageData;
    alt: string;
    title: string;
}


const Card: React.FC<CardProps> = ({ img, alt, title }) => {
  return (
    <div className='mb-6'>
      <Image
        src={img}
        alt={alt}
        width={800} // Set the width of the image
        height={600} // Set the height of the image
        className=' object-cover md:w-80 md:h-80 sm:w-80 sm:h-64  cursor-pointer rounded-2xl'
      />
      <div className="px-5 mt-3">
      <div className='flex justify-between'>
      <h1>{title}</h1>
       <span>Rating</span>
      </div>
      <MapPin />
      <h1>Description</h1>
      <h1>Special Feature:</h1>
      <h1>Price</h1>
      </div>
    </div>
  );
};

export default Card;
