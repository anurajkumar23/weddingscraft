import { Heart, MapPin } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';


interface cardProps {
    id: string;
    img: string | StaticImageData;
    alt: string;
    title: string;
    description: string;
    Price: number
}


const card: React.FC<cardProps> = ({ img, alt, title, description, Price, id }) => {
    return (
        <div className='cursor-pointer  justify-center items-center '>
            <Link href={`/Photographers/${id}`}>
                <div className='grid grid-cols-10 md:w-48 sm:block bg-white z-10  border border-purple-300 p-2 rounded-2xl hover:scale-105 hover:border-purple-400 hover:border-4 transition duration-300 hover:shadow-lg'>
                    <div className='col-span-5'>
                    <Image
                        src={img}
                        alt={alt}
                        width={500}
                        height={500}
                        className='object-cover  md:w-48 w-44 h-44 cursor-pointer rounded-2xl'
                    />
                    </div>
                    {/* <div className='absolute border rounded-full p-1 bg-white ml-1 bottom-[200px] heart-shadow'>
                        <Heart className='text-red-400 fill-red-400 z-30' />
                    </div> */}
                    <div className='p-2 col-span-5'>
                        <div className="mt-3">
                            <strong className='font-medium md:text-lg text-base'>{title}</strong>
                        </div>
                        <div className='justify-between pt-2'>
                            <h1 className='text-gray-600 text-xs'>{description}</h1>
                            {/* <h1 className='text-xl font-bold'>₹{Price}</h1> */}
                        </div>
                        <hr className='h-px  mt-8 bg-black border-0' />
                        <h1 className='mt-2 justify-center flex font-bold cursor-pointer'>ORDER</h1>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default card;
