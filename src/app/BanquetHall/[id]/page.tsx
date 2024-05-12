import MainCardPage from '@/components/MainCard/page'
import React from 'react'

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div>
      <div className='px-4 py-6'>
        <h1 className='text-3xl font-medium mb-4'>Top Banquet Halls in Patna</h1>
        <MainCardPage id={id} />
      </div>
    </div>
  )
}

export default Page
