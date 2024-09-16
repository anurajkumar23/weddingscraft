import React, { useState } from 'react';

interface FilterProps {
  showFilters: boolean;
  onApplyFilters: (filters: Filters) => void;
}

export interface Filters {
  nearMe?: boolean;
  rating: boolean;
  budgetFriendly: boolean;
  availableNow?: boolean;
  sortBy?: 'priceLowToHigh' | 'priceHighToLow'; // Sorting field
  city?: string;
  pincode?: string;
}

const Filter = ({ showFilters, onApplyFilters }: FilterProps) => {
  const [filters, setFilters] = useState<Filters>({
    rating: false,
    budgetFriendly: false,
    sortBy: undefined,
    city:"",
    pincode:""
  });

  // Handle checkbox changes
  const handleFilterChange = (e: { target: { name: any; checked: any } }) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Handle input field changes for city and pincode
  const handleInputChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle sorting option changes
  const handleSortChange = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setFilters((prev) => ({
      ...prev,
      sortBy: value, // Set the selected sort option
    }));
  };

  // Apply filters and send them to the parent
  const applyFilters = () => {
   
    onApplyFilters(filters); // Pass filters to parent component
  };

  return (
    <>
      {showFilters && (
        <div className='border border-gray-300 rounded-md p-4 mt-2'>
          <h3 className='text-lg font-medium mb-2'>Filter Options</h3>
          <div className='flex flex-col space-y-2'>
            <label>
              <input
                type='checkbox'
                name='rating'
                checked={filters.rating}
                onChange={handleFilterChange}
                className='mr-2'
              />
              Ratings (4 stars & up)
            </label>
            <label>
              <input
                type='checkbox'
                name='budgetFriendly'
                checked={filters.budgetFriendly}
                onChange={handleFilterChange}
                className='mr-2'
              />
              Budget-friendly
            </label>

            {/* City input */}
            <div className='mt-4'>
              <label className='block text-sm font-medium'>
                City
              </label>
              <input
                type='text'
                name='city'
                value={filters.city}
                onChange={handleInputChange}
                className='border border-gray-300 p-2 rounded-md w-full'
                placeholder='Enter city name'
              />
            </div>

            {/* Pincode input */}
            <div className='mt-4'>
              <label className='block text-sm font-medium'>
                Pincode
              </label>
              <input
                type='text'
                name='pincode'
                value={filters.pincode}
                onChange={handleInputChange}
                className='border border-gray-300 p-2 rounded-md w-full'
                placeholder='Enter pincode'
              />
            </div>

            {/* Sorting options */}
            <div className='mt-4'>
              <h4 className='text-lg font-medium mb-2'>Sort By</h4>
              <select
                className='border border-gray-300 p-2 rounded-md'
                value={filters.sortBy}
                onChange={handleSortChange}
              >
                <option value=''>Select</option>
                <option value='priceLowToHigh'>Price: Low to High</option>
                <option value='priceHighToLow'>Price: High to Low</option>
              </select>
            </div>
          </div>

          <button
            onClick={applyFilters}
            className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md'
          >
            Apply Filters
          </button>
        </div>
      )}
    </>
  );
};

export default Filter;
