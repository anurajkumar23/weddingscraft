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
        loading='lazy'
      />
      <div className=" mt-3">
      <div className='flex justify-between'>
      <strong className='font-medium md:text-lg text-base'>{title}</strong>
       <span>Rating</span>
      </div>
      <MapPin  className='text-gray-600 max-sm:text-sm'/>
      <h1 className='text-gray-600 max-sm:text-sm'>Description</h1>
      <h1 className='text-gray-600 max-sm:text-sm'>Special Feature:</h1>
      <h1 className='max-sm:text-sm'>Price</h1>
      </div>
    </div>
  );
};

export default Card;
