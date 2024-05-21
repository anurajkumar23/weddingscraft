import MainCardPage from '@/components/MainCard/page'
import getBanquetId from '@/utils/banquet/Getbanquetid'
import React from 'react'

const Page = async ({ params }: { params: { id: string } }) => {
  const banquetData = await getBanquetId(params.id);


  return (
    <div>
      <div className='px-4 py-6'>
        <h1 className='text-3xl font-medium mb-4'>Top Banquet Halls in Patna</h1>
        <MainCardPage banquetData={banquetData} />
      </div>
    </div>
  )
}

export default Page
