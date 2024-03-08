import Image from 'next/image';
import React from 'react';
import Banquet1 from "../../../../public/Banquet-1.jpg";

const BanquetPage: React.FC = () => {
  return (
    <div className='w-auto border px-8 mt-5'>
      <Image
        src={Banquet1}
        alt='banquet'
        width={800} // Set the width of the image
        height={600} // Set the height of the image
        className='object-cover md:w-80 md:h-96 hover:scale-105 transition-transform duration-300 cursor-pointer'
      />
    </div>
  );
};

export default BanquetPage;
