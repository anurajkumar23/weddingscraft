import { SlidersHorizontal } from 'lucide-react';
import React from 'react';

const Page = () => {
  return (
    <div className='px-6 py-4'>
      <h1 className='text-2xl font-medium mb-4'>Top Banquet Halls in Patna</h1>
      <div className='max-w-xs'>
        <div className='border border-gray-500 rounded-md p-2 flex items-center cursor-pointer'>
          <SlidersHorizontal className='mr-2' size={24} />
          <span className='text-base font-medium'>Filters</span>
        </div>
      </div>
    </div>
  );
};

export default Page;
