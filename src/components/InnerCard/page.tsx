import { Heart, MapPin } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

interface InnerPageProps {
    img: string | StaticImageData;
    alt: string;
    title: string;
    link?: string;
    id: string;
}

const InnerPage: React.FC<InnerPageProps> = ({ img, alt, title, link, id }) => {
    return (
        <div>
            <Link href={`/${link}/${id}`} key={id} >
        <div className='mb-6 md:w-3/4 border p-4 bg-slate-100 rounded-md'>
            <div className='flex'>
                <Image
                    src={img}
                    alt={alt}
                    width={400}
                    height={300}
                    className='object-cover md:w-60 md:h-60 sm:w-60 sm:h-64 w-48 h-56 cursor-pointer rounded-2xl'
                />
                <div className='w-full px-4 m-3 mb-2'>
                    <div className='flex justify-between'>
                    <h1 className='text-xl font-medium mb-2'>{title}</h1>
                    <Heart className='cursor-pointer'/>
                    </div>
                    <div className='flex gap-x-2 items-center pb-2'>
                        <span className='border p-1 rounded-sm bg-green-600 text-white'>4.5</span>
                        <h1 className='text-gray-600'>Ratings</h1>
                    </div>
                    <div className="flex items-center mb-2">
                        <MapPin className='mr-2' />
                        <span className="text-gray-600">Location</span>
                    </div>
                    <h1>Details:</h1>
                </div>

            </div>
            <div className='pt-3 flex md:justify-center'>
                <Button className='mr-2 mb-2 bg-green-600 hover:bg-green-700 hover:text-white text-white text-base' variant="outline">Request Pricing</Button>
                <Button className='bg-blue-600 hover:bg-blue-700 hover:text-white text-white text-base' variant="outline">For more details</Button>
            </div>
        </div>
        </Link>
        </div>
    );
};

export default InnerPage;
