import Image, { StaticImageData } from 'next/image';
import React from 'react';


interface ImageProps{
    img: string| StaticImageData;
    alt: string;
    title: string;
    number:string|number
}


const ImageContainer: React.FC<ImageProps> = ({ img, alt, title, number }) => {
  return (
    <div className='mb-6'>
      <Image
        src={img}
        alt={alt}
        width={800} // Set the width of the image
        height={600} // Set the height of the image
        className=' object-cover md:w-44 md:h-44  cursor-pointer rounded-2xl'
      />
      <div className=" mt-3">
      <div className='flex'>
      <strong className='font-medium md:text-lg text-base'>{title}</strong>
      </div>
      <p>{number} {title === 'Photos' ? `${title}/video` : title}</p>
      </div>
    </div>
  );
};

export default ImageContainer;
