import React from 'react';

import getPhotographer from '@/utils/Photographer/GetPhotographer';
import { SlidersHorizontal } from 'lucide-react';
import InnerCardPage from '@/components/InnerCard/InnerCardPage';

export const metadata = {
  title: "Wedding Photographers",
  description:
    "Capture every special moment with professional wedding photographers. At Dream Wedding, discover talented photographers who specialize in capturing the essence and emotion of your big day. Whether you prefer candid shots, traditional poses, or artistic compositions, find the perfect photographer to create timeless memories.",
  alternates: {
    canonical: `/Photographers`
  },
};


const page = async () => {
  const Photographer = await getPhotographer()

  return (
    <div className='px-6 py-4'>
      <h1 className='text-2xl font-medium mb-4'>Top Photographer</h1>
      <div className='max-w-xs'>
        <div className='border border-gray-500 rounded-md p-2 flex items-center cursor-pointer'>
          <SlidersHorizontal className='mr-2' size={24} />
          <span className='text-base font-medium'>Filters</span>
        </div>
      </div>
      <InnerCardPage data={Photographer} link="Photographer" imgLink="photographer"/>
    </div>
  );
};

export default page;
