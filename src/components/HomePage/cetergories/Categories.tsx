import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface CategoryProps {
  src: StaticImageData;
  alt: string;
  title: string;
}

const Categories: React.FC<CategoryProps> = ({ src, alt, title }) => {
  return (
    <div className="flex flex-row items-start justify-center pt-[6.687rem] px-[1.25rem] pb-[6.125rem] relative">
      <Image
        className="border border-blue-400 h-full w-full absolute top-0 right-0 bottom-0 left-0 rounded-[20px] max-w-full overflow-hidden max-h-full object-cover"
        loading="lazy"
        alt={alt}
        src={src}
      />
      <h2 className="m-0 relative font-semibold text-inherit inline-block text-shadow min-w-[6.75rem] z-1 mq450:text-[1.188rem]">
        {title}
      </h2>
    </div>
  );
};

export default Categories;
