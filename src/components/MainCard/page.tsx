import { MapPin, MapPinned, PhoneCall } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';

const MainCardPage: React.FC = () => {
    return (
        <div className='w-full h-full flex'>
            <div className='h-full w-3/5'>
                <div className='h-full'>
                    <Image
                        height={500}
                        width={500}
                        src="/Banquet-2.jpg"
                        alt="BanquetHall"
                        loading="lazy"
                        className='w-full h-96 rounded-sm object-cover'
                    />
                    <div className='relative bottom-20 mx-4 bg-white rounded-sm p-4 shadow-xl border'>
                        <div className='flex justify-between items-center'>
                            <strong className='font-medium md:text-lg text-base'>Radha-Shayam Banquet Hall </strong>
                            <div className='flex gap-x-2 items-center'>
                                <span className='border p-1 rounded-sm bg-green-600 text-white'>4.5</span>
                                <h1 className='text-gray-600'>Ratings</h1>
                            </div>
                        </div>
                        <div className="flex items-center mb-2">
                            <MapPin className='mr-2' />
                            <span className="text-gray-600">Location</span>
                            <span className='border flex gap-x-2 ml-4 p-1 rounded-sm bg-green-600 text-white cursor-pointer'>View on Map
                                <MapPinned />
                            </span>
                        </div>
                        <h1>Details:</h1>
                        <Button className='mr-2 mb-2 mt-2 gap-x-2 bg-green-600 hover:bg-green-700 hover:text-white text-white text-base' variant="outline">
                            <PhoneCall />
                            Contact Us
                        </Button>
                        
                    </div>
                </div>
            </div>
            <div className='border-2 rounded-sm ml-5 w-2/5 p-4'>
                <div className=' border w-full shadow-md p-4 cursor-pointer rounded-sm  '>
                <p className='text-red-600 text-2xl font-semibold pb-4 '>Starting Price</p>
                <hr/>
                <div className=' flex gap-x-2'>
                <p className='text-gray-600'>Starting Price : </p>
                <p className='text-gray-400'> ₹ 50,000</p>
                </div>
                </div>
                <div className=' pt-4 '>
                    <div className='border p-4 shadow-md'>
                    <p className='text-2xl font-semibold text-red-600 '> Caterers</p>
                    <hr/>
                    <li>hi</li>
                    <li>h2</li>
                    <li>h3</li>
                    </div>
                </div>
                <div className=' border w-full shadow-md p-4 cursor-pointer rounded-sm  '>
                <p className='text-red-600 text-2xl font-semibold pb-4 '>Decorators</p>
                <hr/>
                <div className=' flex gap-x-2'>
                <p className='text-gray-600'>Starting Price : </p>
                <p className='text-gray-400'> ₹ 15,000</p>
                </div>
                </div>
                <div className=' border w-full shadow-md p-4 cursor-pointer rounded-sm  '>
                <p className='text-red-600 text-2xl font-semibold pb-4 '>Photographers</p>
                <hr/>
                <div className=' flex gap-x-2'>
                <p className='text-gray-600'>Starting Price : </p>
                <p className='text-gray-400'> ₹ 15,000</p>
                </div>
                </div>
            </div>
        </div>
    );
};

export default MainCardPage;
