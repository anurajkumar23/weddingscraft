import Image from 'next/image'
import React from 'react'
import ServiceImg from "../../../../public/Design_elements/pngegg (97).png"

const Services = () => {
    return (
        <div className='w-full container max-h-full '>
            <div className='relative grid grid-cols-1 md:grid-cols-2  md:mx-6'>
                <div className='relative'>
                    <div className='absolute top-[20px] left-[20px] md:left-0'>
                        <div className='w-full justify-center items-center text-center'>
                            <p className='font-bold text-2xl md:text-3xl text-red-500'>10+</p>
                            <p className='text-gray-400 text-lg md:text-xl'>Services</p>
                        </div>
                    </div>
                    <div className='absolute left-[150px] md:left-[300px] top-[100px] border p-2 rounded-lg shadow-xl bg-white'>
                        <p className='font-bold text-2xl md:text-3xl text-red-500'>100+</p>
                        <p className='text-gray-400 text-lg md:text-xl'>Cities</p>
                    </div>
                    <div className='absolute left-[180px] md:left-[350px] border p-2 rounded-lg shadow-xl bg-white top-[200px] md:top-[210px]'>
                        <div className='w-full justify-center items-center text-center'>
                            <p className='font-bold text-2xl md:text-3xl text-red-500'>500+</p>
                            <p className='text-gray-400 text-lg md:text-xl'>Banquets, caterers,</p>
                            <p className='text-gray-400 text-lg md:text-xl'>decorators and photo...</p>
                        </div>
                    </div>
                    <Image
                        src={ServiceImg}
                        alt='ServicesImage'
                        className='w-full h-auto mt-8 md:mt-0'
                    />
                </div>
                <div className='justify-end text-end py-8 md:py-16'>
                    <p className='text-3xl md:text-5xl font-bold pb-2'>We Offer The</p>
                    <div className='flex flex-col md:flex-row text-3xl md:text-5xl gap-x-2 font-bold text-end justify-end pb-2'>
                        <p>Best</p>
                        <p className='text-red-500 Services'>Services</p>
                    </div>
                    <p className='text-3xl md:text-5xl font-bold pb-2'>For You</p>
                    <div className='ml-10 md:ml-20 text-gray-400 text-base md:text-2xl'>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus laborum architecto, optio modi iusto repellendus voluptatem accusamus nihil inventore nesciunt est voluptate sit impedit sapiente deleniti placeat rem, dolorum earum.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services
