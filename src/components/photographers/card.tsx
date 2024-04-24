import { MapPin } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import React from 'react';


interface cardProps {
    img: string | StaticImageData;
    alt: string;
    title: string;
    description: string;
    Price: number
}


const card: React.FC<cardProps> = ({ img, alt, title, description, Price }) => {
    return (
        <div className='flex cursor-pointer justify-center items-center'>
        <div className='w-48  h-auto border-2 p-2 rounded-2xl shadow-xl hover:border-purple-400 hover:border-4 transition duration-300'>
            <Image
                src={img}
                alt={alt}
                width={500}
                height={500}
                className='object-cover w-48 h-44 cursor-pointer rounded-2xl'
            />
            <div className="mt-3">
                <strong className='font-medium md:text-lg text-base'>{title}</strong>
            </div>
            <div className='flex justify-between pt-2'>
                <h1 className='text-gray-600 text-xs'>{description}</h1>
                <h1 className='text-xl font-bold'>₹{Price}</h1>
            </div>
            <hr className='h-px mt-8 bg-black border-0' />
            <h1 className='mt-2 justify-center flex font-bold cursor-pointer'>ORDER</h1>
        </div>
    </div>
    );
};

export default card;
