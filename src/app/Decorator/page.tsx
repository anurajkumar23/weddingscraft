import React from 'react';
// import Decorators from './Decorators';
import getDecorator from '@/utils/decorator/getDecorator';
import { SlidersHorizontal } from 'lucide-react';
import InnerCardPage from '@/components/InnerCard/InnerCardPage';

export const metadata = {
  title: "Wedding Decorators",
  description: "Transform your wedding venue with the best decorators. At Dream Wedding, connect with top-rated wedding decorators who can bring your vision to life. Whether you desire a traditional, modern, or unique theme, find the perfect decorator to make your special day beautiful and unforgettable.",
  alternates: {
    canonical: `/Decorators`
  },
};

const page = async () => {
  const decoratorsData = await getDecorator();

  return (
    <div className='px-6 py-4'>
      <h1 className='text-2xl font-medium mb-4'>Top Decorators</h1>
      <div className='max-w-xs'>
        <div className='border border-gray-500 rounded-md p-2 flex items-center cursor-pointer'>
          <SlidersHorizontal className='mr-2' size={24} />
          <span className='text-base font-medium'>Filters</span>
        </div>
      </div>
      <InnerCardPage data={decoratorsData} link="Decorators" imgLink="decorator"/>
    </div>
  );
};

export default page;
