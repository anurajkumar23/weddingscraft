// PhotoData.jsx
import Image from 'next/image';
import React from 'react';
import element1 from "../../../public/elements/15_20240427_221554_0008.png";
import element2 from "../../../public/elements/10_20240427_221553_0003.png";

const PhotoData = () => {
    return (
        <div className="rounded-lg flip-card-back border-2  text-white w-full h-[425px] card-component border-purple-300 p-2 rounded-2x hover:border-purple-400 transition-height duration-300 ease-in-out">
            {/* Your content goes here */}
            <h1 className='pt-4 p-2'>
                Hello EveryOne how are you
            </h1>

            <Image
                src={element1}
                alt="background image"
                className="relative w-80 -z-0 -bottom-[250px] left-28 overflow-hidden"
                loading='lazy'
            />
            <Image
                src={element1}
                alt="background image"
                className="relative w-80 -z-0 rotate-180 bottom-[273px] right-28 overflow-hidden"
                loading='lazy'
            />
            <Image
                src={element2}
                alt="background image"
                className="photographer_element2 overflow-hidden relative z-0  max-w-[900px] right-[315px] bottom-[450px]"
                loading='lazy'
            />
        </div>
    );
};

export default PhotoData;
