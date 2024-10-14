
import React from 'react';

import getPhotographer from '@/utils/Photographer/GetPhotographer';

import InnerCardPage from '@/components/InnerCard/InnerCardPage';
import FilterData from '@/components/filter/FilterData';

export const metadata = {
  title: "Wedding Photographers",
  description:
    "Capture every special moment with professional wedding photographers. At Dream Wedding, discover talented photographers who specialize in capturing the essence and emotion of your big day. Whether you prefer candid shots, traditional poses, or artistic compositions, find the perfect photographer to create timeless memories.",
  alternates: {
    canonical: `/Photographers`
  },
};


const page = async ({ searchParams }: { searchParams: Record<string, string> }) => {
  
  const Photographer = await getPhotographer(searchParams)

  return (
    <div className='px-6 py-4'>
      <h1 className='text-2xl font-medium mb-4'>Top Photographer</h1>
      <FilterData />
      <InnerCardPage data={Photographer} link="Photographer"  category='Photographer'/>
    </div>
  );
};

export default page;
