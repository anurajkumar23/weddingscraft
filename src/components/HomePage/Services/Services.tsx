import Image from 'next/image';
import React from 'react';
import ServiceImg from '../../../../public/Design_elements/pngegg (97).png';

const Services = () => {
  return (
    <div className='w-full container mx-auto px-4 md:px-0 max-h-full'>
      <div className='p-6 relative grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='relative'>
          {/* 10+ Services */}
          <div className='absolute top-[10px] left-[50%] sm:top-[20px] sm:left-[50%] md:left-0 md:translate-x-0 transform -translate-x-1/2'>
            <div className='w-full text-center'>
              <p className='font-bold text-xl sm:text-2xl md:text-3xl text-red-500'>10+</p>
              <p className='text-gray-400 text-sm sm:text-base md:text-xl'>Services</p>
            </div>
          </div>

          {/* 100+ Cities */}
          <div className='absolute top-[80px] left-[70%]  sm:left-[320px] sm:top-[50px] transform -translate-x-1/2 md:translate-x-0 border p-2 rounded-lg shadow-xl bg-white'>
            <p className='font-bold text-xl sm:text-2xl md:text-3xl text-red-500'>100+</p>
            <p className='text-gray-400 text-sm sm:text-base md:text-xl'>Cities</p>
          </div>

          {/* 500+ Banquets, etc. */}
          <div className='absolute top-[200px] left-[80%] -right-[30%] md:-right-0 sm:top-[40%] sm:left-[50%] md:left-[350px] md:top-[220px] transform -translate-x-1/2 md:translate-x-0 border p-2 rounded-lg shadow-xl bg-white'>
            <div className='w-full text-center'>
              <p className='font-bold text-xl sm:text-2xl md:text-3xl text-red-500'>500+</p>
              <p className='text-gray-400 text-sm sm:text-base md:text-xl'>Banquets, caterers,</p>
              <p className='text-gray-400 text-sm sm:text-base md:text-xl'>decorators and photo...</p>
            </div>
          </div>

          <Image
            src={ServiceImg}
            alt='Services Image'
            className='w-full h-auto mt-8 md:mt-0'
          />
        </div>

        <div className='flex flex-col justify-center text-center md:text-right py-8 md:py-16'>
          <div className='p-4'>
            <p className='text-2xl md:text-4xl font-bold pb-2'>We Offer The</p>
            <div className='flex flex-col md:flex-row justify-center md:justify-end text-2xl md:text-5xl gap-x-2 font-bold pb-2'>
              <p>Best</p>
              <p className='text-red-500 Services'>Services</p>
            </div>
            <p className='text-2xl md:text-4xl font-bold pb-2'>For You</p>
          </div>
          <div className='text-gray-400 text-sm sm:text-base md:text-xl mx-auto'>
            <p>Dream Wedding is your all-in-one booking platform for exquisite weddings and events. We connect you with top-tier banquet halls, decorators, photographers, and caterers, ensuring every detail of your special day is perfect.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
