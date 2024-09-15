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
  }
  

const Filter = ({ showFilters, onApplyFilters }:FilterProps) => {
  const [filters, setFilters] = useState<Filters>({
    // nearMe: false,
    rating: false,
    budgetFriendly: false,
    // availableNow: false,
  });

  // Handle checkbox changes
  const handleFilterChange = (e: { target: { name: any; checked: any; }; }) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: checked,
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
            {/* <label>
              <input
                type='checkbox'
                name='nearMe'
                checked={filters.nearMe}
                onChange={handleFilterChange}
                className='mr-2'
              />
              Near Me
            </label> */}
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
            {/* <label>
              <input
                type='checkbox'
                name='availableNow'
                checked={filters.availableNow}
                onChange={handleFilterChange}
                className='mr-2'
              />
              Available Now
            </label> */}
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
