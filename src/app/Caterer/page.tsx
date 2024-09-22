import React from 'react';

import getCaterer from '@/utils/caterer/GetCaterer';
import InnerCardPage from '@/components/InnerCard/InnerCardPage';
import FilterData from '@/components/filter/FilterData';
import page from '../page';

export const metadata = {
  title: "Wedding Caterers",
  description:
    "Delight your guests with exquisite cuisine from the best wedding caterers. At Dream Wedding, find top-rated caterers who offer a variety of menus to suit your taste and budget. Whether you prefer traditional dishes or gourmet specialties, ensure your wedding is a culinary success with exceptional catering services.",
  alternates: {
    canonical: `/Caterers`
  },
};

const Page = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const Caterer = await getCaterer(searchParams); 

  return (
    <div className='px-6 py-4'>
      <h1 className='text-2xl font-medium mb-4'>Top Caterers</h1>
      <FilterData />
      {/* <div className='max-w-xs'>
        <div className='border border-gray-500 rounded-md p-2 flex items-center cursor-pointer'>
          <SlidersHorizontal className='mr-2' size={24} />
          <span className='text-base font-medium'>Filters</span>
        </div>
      </div> */}
      <InnerCardPage data={Caterer} link="Caterer" imgLink="caterer"/>
    </div>
  );
};

export default Page;
