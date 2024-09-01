import Image from 'next/image'
import React from 'react'
import ServiceImg from "../../../../public/Design_elements/pngegg (97).png"

const Services = () => {
    return (
        <div className='w-full container max-h-full '>
            <div className='relative grid grid-cols-2 mx-6'>
                <div >
                    <div className='absolute'>
                        <div className='w-full justify-center items-center text-center'>
                            <p className='font-bold text-3xl text-red-500'>10+</p>
                            <p className='text-gray-400 text-xl'>Services </p>
                        </div>
                    </div>
                    <div className='absolute left-[300px] top-[80px] border p-2 rounded-lg shadow-xl bg-white'>
                        <p className='font-bold text-3xl text-red-500'>100+</p>
                        <p className='text-gray-400 text-xl'>Cities </p>
                    </div>
                    <div className='absolute left-[350px] border p-2 rounded-lg shadow-xl bg-white top-[210px]'>
                        <div className='w-full justify-center items-center text-center'>
                            <p className='font-bold text-3xl text-red-500'>500+</p>
                            <p className='text-gray-400 text-xl'>Banquets, caterers,</p>
                            <p className='text-gray-400 text-xl'>decoretors and photo... </p>
                        </div>

                    </div>
                    <Image
                        src={ServiceImg}
                        alt='ServicesImage'
                    />

                </div>
                <div className='justify-end text-end py-8'>
                    <p className='text-5xl font-bold pb-2'>We Offer The</p>
                    <div className='flex text-5xl gap-x-2 font-bold text-end justify-end pb-2'>
                        <p>Best</p>
                        <p className='text-red-500 Services'>Services</p>
                    </div>
                    <p className='text-5xl font-bold pb-2'>For You</p>
                    <div className='ml-20 text-gray-400 text-2xl'>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus laborum architecto, optio modi iusto repellendus voluptatem accusamus nihil inventore nesciunt est voluptate sit impedit sapiente deleniti placeat rem, dolorum earum.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services
