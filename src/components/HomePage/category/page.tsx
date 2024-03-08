import Image from 'next/image';

import Banquet1 from "../../../../public/Banquet-1.jpg";
import Banquet2 from "../../../../public/Banquet-2.jpg";
import Catering from "../../../../public/cattering.jpg"
import Photographer from "../../../../public/Photographer.jpeg";

const CategoryPage = () => {
    return (
        <div className='mt-4 flex flex-wrap justify-around w-full h-full'>
            <div className='md:w-48 md:h-48 w-36 h-36 '>
                <div className='border overflow-hidden flex justify-center items-center rounded-full'>
                    <Image
                        src={Banquet1}
                        alt='banquet'
                        className='object-cover md:w-48 md:h-48 w-36 h-36 hover:scale-105 transition-transform duration-300 cursor-pointer'
                    />
                </div>
                <h1 className='text-center font-medium'>Banquet Halls</h1>
            </div>
            <div className='md:w-48 md:h-48 w-36 h-36 '>
                <div className='border overflow-hidden flex justify-center items-center rounded-full'>
                    <Image
                        src={Banquet2}
                        alt='decorator'
                        className='object-cover md:w-48 md:h-48 w-36 h-36 hover:scale-105 transition-transform duration-300 cursor-pointer'
                    />
                </div>
                <h1 className='text-center font-medium'>Decorators</h1>
            </div>
            <div className='md:w-48 md:h-48 w-36 h-36 '>
                <div className='border overflow-hidden flex justify-center items-center rounded-full'>
                    <Image
                        src={Catering}
                        alt='caterer'
                        className='object-cover md:w-48 md:h-48 w-36 h-36 hover:scale-105 transition-transform duration-300 cursor-pointer'
                    />
                </div>
                <h1 className='text-center font-medium'>Caterers</h1>
            </div>
            <div className='md:w-48 md:h-48 w-36 h-36 '>
                <div className='border overflow-hidden flex justify-center items-center rounded-full'>
                    <Image
                        src={Photographer}
                        alt='photographer'
                        className='object-cover md:w-48 md:h-48 w-36 h-36 hover:scale-105 transition-transform duration-300 cursor-pointer'
                    />
                </div>
                <h1 className='text-center font-medium'>Photographers</h1>
            </div>
        </div>
    );
};

export default CategoryPage;
