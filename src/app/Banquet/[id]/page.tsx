import MainCardPage from '@/components/MainCard/page'
import { incrementVisit } from '@/utils/analytics/analyticsService';
import getBanquetId from '@/utils/banquet/GetbanquetId'
import React from 'react'

const Page = async ({ params }: { params: { id: string } }) => {
  const banquetData = await getBanquetId(params.id);

incrementVisit(banquetData)
  return (
    <div>
      <div className='md:mx-4 py-6'>
        <MainCardPage banquetData={banquetData} />
      </div>
    </div>
  )
}

export default Page
