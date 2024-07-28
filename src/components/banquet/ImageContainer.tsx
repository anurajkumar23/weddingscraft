import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface ImageProps {
  img: string | StaticImageData;
  alt: string;
}

const ImageContainer: React.FC<ImageProps> = ({ img, alt }) => {
  return (
    <div>
     
    <Image
      src={img}
      alt={alt}
      width={800} // Set the width of the image
      height={600} // Set the height of the image
      className='object-cover md:w-52 md:h-52 cursor-pointer rounded-2xl'
      loading='lazy'
    />
    </div>
  );
};

export default ImageContainer;
