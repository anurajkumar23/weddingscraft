import React from 'react';

import getCaterer from '@/utils/caterer/GetCaterer';
import { SlidersHorizontal } from 'lucide-react';
import InnerCardPage from '@/components/InnerCard/InnerCardPage';

export const metadata = {
  title: "Wedding Caterers",
  description:
    "Delight your guests with exquisite cuisine from the best wedding caterers. At Dream Wedding, find top-rated caterers who offer a variety of menus to suit your taste and budget. Whether you prefer traditional dishes or gourmet specialties, ensure your wedding is a culinary success with exceptional catering services.",
  alternates: {
    canonical: `/Caterers`
  },
};

const page = async () => {
  const Caterer = await getCaterer()

  return (
    <div className='px-6 py-4'>
      <h1 className='text-2xl font-medium mb-4'>Top Caterers</h1>
      <div className='max-w-xs'>
        <div className='border border-gray-500 rounded-md p-2 flex items-center cursor-pointer'>
          <SlidersHorizontal className='mr-2' size={24} />
          <span className='text-base font-medium'>Filters</span>
        </div>
      </div>
      <InnerCardPage data={Caterer} link="Caterers" imgLink="caterer"/>
    </div>
  );
};

export default page;
