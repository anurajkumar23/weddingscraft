import React from 'react';
import getDecorator from '@/utils/decorator/getDecorator';
import InnerCardPage from '@/components/InnerCard/InnerCardPage';
import FilterData from '@/components/filter/FilterData';

export const metadata = {
  title: "Wedding Decorators",
  description: "Transform your wedding venue with the best decorators. At Dream Wedding, connect with top-rated wedding decorators who can bring your vision to life. Whether you desire a traditional, modern, or unique theme, find the perfect decorator to make your special day beautiful and unforgettable.",
  alternates: {
    canonical: `/Decorators`
  },
};

const page = async ({ searchParams }: { searchParams: Record<string, string> }) => {
  const decoratorsData = await getDecorator(searchParams);

  return (
    <div className='px-6 py-4'>
      <h1 className='text-2xl font-medium mb-4'>Top Decorators</h1>
      <FilterData />
      <InnerCardPage data={decoratorsData} link="Decorator" imgLink="decorator" category="Decorator"/>
    </div>
  );
};

export default page;
