import { MapPin, MapPinned, PhoneCall } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';

const MainCardPage: React.FC = () => {
    return (
        <div className='h-full w-3/5 '>
            <div className='h-full w-full'>
                <Image
                    height={500}
                    width={500}
                    src="/Banquet-2.jpg"
                    alt="BanquetHall"
                    loading="lazy"
                    className='w-full h-96 rounded-sm'
                />
                <div className='relative bottom-20 mx-4 bg-white rounded-sm p-4 shadow-xl border'>
                    <div className='flex justify-between'>
                        <strong className='font-medium md:text-lg text-base '>Radha-Shayam Banquet Hall </strong>
                        <div className='flex gap-x-2 items-center pb-2'>
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
                        Contact Us</Button>
                </div>
            </div>
        </div>
    );
};

export default MainCardPage;
