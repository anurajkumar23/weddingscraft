"use client"
import { Heart, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import element1 from "../../../public/elements/15_20240427_221554_0008.png";
import element2 from "../../../public/elements/10_20240427_221553_0003.png";
import PhotoData from './PhotoData';

interface CardProps {
    id: string;
    title: string;
    description1: string;
    description2: string;
    Price: number;
}

const InnerCard: React.FC<CardProps> = ({ title, description1,description2, Price, id }) => {

    const [showPhotoData, setShowPhotoData] = useState(false);
    const [isRotated, setIsRotated] = useState(false);

    const handleExploreMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setShowPhotoData(!showPhotoData); // Toggle the state to show/hide PhotoData
        setIsRotated(!isRotated); // Toggle the rotation state
    };

    return (
        <div className="relative h-full w-full flex justify-center items-center ">
            <Link href={`/Photographers/${id}`}>
            <div className={`relative justify-center items-center transition-transform duration-500 transform z-1 w-72 h-[420px] rounded-xl shadow-2xl text-white card-component border border-cyan-300 p-2 hover:border-cyan-400 hover:shadow-lg hover:flip-card ${isRotated ? ' flip-card'  : ''} `} >
                    <div className="z-10 w-full absolute ">
                        <div className="pt-5">
                            <strong className="font-bold text-5xl text-white font-serif flex justify-center">
                                {title}
                            </strong>
                            <h1 className="justify-center flex text-sm text-slate-300">Photography</h1>
                            <div className="pt-2 font-bold font-sans">
                                <h1 className="justify-center flex mx-10 text-center">{description1}</h1>
                                {/* <h1 className="justify-center flex">timeless Elegance</h1> */}
                            </div>
                        </div>
                        <hr className="h-px mx-6 mt-4 bg-slate-500" />
                        <div className="flex justify-between pt-2">
                            <h1 className="mx-8 text-base font-extralight font-sans flex text-center">
                                {description2}
                            </h1>

                        </div>
                        <h1 className='justify-center pt-2 text-xl font-bold flex'>₹{Price}</h1>
                        <div className="mt-4 mb-4 relative z-10 justify-center flex cursor-pointer">
                        <button 
                                onClick={handleExploreMoreClick} 
                                className={`rounded-full hover:bg-blue-500 p-2 px-3 bg-[#ed4ebb]`}
                            >
                                {showPhotoData ? "Close" : "Explore more"}
                            </button>
                        </div>

                    </div>
                    <Image
                        src={element1}
                        alt="background image"
                        className="relative w-80 -z-0 -bottom-[292px] left-28 overflow-hidden"
                    />
                    <Image
                        src={element1}
                        alt="background image"
                        className="relative w-80 -z-0 rotate-180 bottom-[230px] right-28 overflow-hidden"
                    />
                    <Image
                        src={element2}
                        alt="background image"
                        className="photographer_element2 overflow-hidden relative z-0  max-w-[900px] right-[315px] bottom-[410px]"
                    />
                    {showPhotoData && (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-10 duration-300">
                    <PhotoData />
                </div>
                    )}
                </div>
            </Link>
        </div>
    );
};

export default InnerCard;