"use client"
import React, { useState, useEffect } from 'react';
import InnerCardPage from '@/components/InnerCard/InnerCardPage';
import getBanquet from '@/utils/banquet/GetBanquet';
import { SlidersHorizontal } from 'lucide-react';
import { incrementPageView } from '@/utils/analytics/analyticsService';
import Filter from './filter';
import {Filters} from "./filter"

// export const metadata = {
//   title: "Banquet Halls / Marriage Hall",
//   description:
//     "Discover and book the best banquet halls and marriage halls for your special occasions. With Dream Wedding, find the perfect venue that fits your style and budget. Enjoy seamless planning and exceptional service to make your wedding day truly unforgettable.",
//   alternates: {
//     canonical: `/BanquetHall`
//   },
// };

const Page = () => {
  const [banquet, setBanquet] = useState([]);
  const [showFilters, setShowFilters] = useState(false); // state to show/hide filters
  const [filters, setFilters] = useState({}); // store applied filters

  // Fetch banquet data in useEffect when the component mounts
  useEffect(() => {
    const fetchBanquetData = async () => {
      console.log("filtere applied",filters)
      try {
        const banquetData = await getBanquet(filters); // Pass filters to API
        console.log("🚀 ~ fetchBanquetData ~ banquetData:", banquetData)
        setBanquet(banquetData); // Update state with fetched data
        incrementPageView(banquetData); // Increment page view
      } catch (error) {
        console.error('Failed to fetch banquet data:', error);
      }
    };

    fetchBanquetData(); // Call the async function
  }, [filters]); // Re-fetch data when filters change

  // Function to toggle filter visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Handle filter application
  const handleApplyFilters = (appliedFilters: Filters) => {
    setFilters(appliedFilters); // Update the filters state when user applies filters
  };

  return (
    <div className='px-6 py-4'>
      <h1 className='text-2xl font-medium mb-4'>Top Banquet Halls in Patna</h1>
      <div className='max-w-xs mb-4'>
        <div 
          className='border border-gray-500 rounded-md p-2 flex items-center cursor-pointer' 
          onClick={toggleFilters} // Toggle filters on click
        >
          <SlidersHorizontal className='mr-2' size={24} />
          <span className='text-base font-medium'>Filters</span>
        </div>

        {/* Filters dropdown */}
        <Filter showFilters={showFilters} onApplyFilters={handleApplyFilters} />
      </div>

      {/* Render InnerCardPage with the fetched banquet data */}
      <InnerCardPage data={banquet} link="BanquetHall" imgLink="banquet" />
    </div>
  );
};

export default Page;