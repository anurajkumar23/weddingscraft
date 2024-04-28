import { Heart, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import element1 from "../../../public/elements/15_20240427_221554_0008.png";
import element2 from "../../../public/elements/10_20240427_221553_0003.png";

interface CardProps {
  id: string;
  title: string;
  description: string;
  Price: number;
}

const InnerCard: React.FC<CardProps> = ({ title, description, Price, id }) => {
  return (
    <div className="relative h-full w-full flex justify-center items-center">
      <Link href={`/Photographers/${id}`}>
        <div className="z-1 w-72 h-96 rounded-xl shadow-2xl text-white card-component border border-cyan-300 p-2 hover:border-cyan-400 hover:shadow-lg">
          <div className="z-1 w-full">
            <div className="pt-5">
              <strong className="font-bold text-5xl text-white font-serif flex justify-center">
                {title}
              </strong>
              <h1 className="justify-center flex text-sm text-slate-300">Photography</h1>
              <div className="pt-2 font-bold font-sans">
                <h1 className="justify-center flex">Experience</h1>
                <h1 className="justify-center flex">timeless Elegance</h1>
              </div>
            </div>
            <hr className="h-px mx-6 mt-4 bg-slate-500" />
            <div className="flex justify-between pt-2">
              <h1 className="mx-8 text-base font-extralight font-sans flex text-center">
                {description}
              </h1>
            </div>
            <div className="mt-4 mb-4 relative z-10 justify-center flex cursor-pointer">
              <button className="rounded-full bg-blue-500 p-2 px-3 hover:bg-[#ed4ebb]">
                Book Now
              </button>
            </div>
            <Image
              src={element1}
              alt="background image"
              className="relative w-80 -z-0 -top-32 left-28 overflow-hidden"
            />
            <Image
              src={element1}
              alt="background image"
              className="relative w-80 -z-0 rotate-180 bottom-[612px] right-28 overflow-hidden"
            />
            <Image
              src={element2}
              alt="background image"
              className="photographer_element2 overflow-hidden relative z-0  max-w-[900px] right-[315px] bottom-[810px]"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default InnerCard;