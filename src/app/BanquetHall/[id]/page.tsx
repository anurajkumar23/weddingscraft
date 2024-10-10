import MainCardPage from '@/components/MainCard/page'
import { incrementVisit } from '@/utils/analytics/analyticsService';
import getBanquetId from '@/utils/banquet/Getbanquetid'
import React from 'react'

const Page = async ({ params }: { params: { id: string } }) => {
  const banquetData = await getBanquetId(params.id);
  

incrementVisit(banquetData)
  return (
    <div>
      <div className='md:mx-4 py-6'>
        <h1 className='mx-4 sm:mx-0 text-3xl font-medium mb-4'>Top Banquet Halls in Patna</h1>
        <MainCardPage banquetData={banquetData} />
      </div>
    </div>
  )
}

export default Page
