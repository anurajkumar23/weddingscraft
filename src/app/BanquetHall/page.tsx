import InnerCardPage from '@/components/InnerCard/InnerCardPage';
import getBanquet from '@/utils/banquet/GetBanquet';
import { SlidersHorizontal } from 'lucide-react';
import React from 'react';


export const metadata = {
  title: "Banquet Halls / Marriage Hall",
  description:
    "Discover and book the best banquet halls and marriage halls for your special occasions. With Dream Wedding, find the perfect venue that fits your style and budget. Enjoy seamless planning and exceptional service to make your wedding day truly unforgettable.",
  alternates: {
    canonical: `/BanquetHall`
  },
};


const Page = async () => {

  const Banquet = await getBanquet()


  return (
    <div className='px-6 py-4'>
      <h1 className='text-2xl font-medium mb-4'>Top Banquet Halls in Patna</h1>
      <div className='max-w-xs'>
        <div className='border border-gray-500 rounded-md p-2 flex items-center cursor-pointer'>
          <SlidersHorizontal className='mr-2' size={24} />
          <span className='text-base font-medium'>Filters</span>
        </div>
      </div>
      <InnerCardPage banquetData={Banquet}  />
    </div>
  );
};

export default Page;
