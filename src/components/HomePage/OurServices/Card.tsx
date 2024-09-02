
import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface CardProps {
  img: string | StaticImageData;
  alt: string;
  title: string;
  desc: string;
}

const Card: React.FC<CardProps> = ({ img, alt, title, desc }) => {
  return (
    <div className="bg-white ive shadow-[0px_5px_10px_rgba(0,_0,_0,_0.25)] rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <Image
        src={img}
        alt={alt}
        width={800} 
        height={600} 
        className="object-cover"
        loading="lazy"
      />
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{desc}</p>
      </div>
    </div>
  );
};

export default Card;
