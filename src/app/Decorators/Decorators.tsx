"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface DecoratorsProps {
  _id: string;
  title: string;
  description: string;
  img: string[];
}

const Decorators: React.FC<DecoratorsProps> = ({ title, img, description, _id }) => {
  return (
    <Link href={`/Decorators/${_id}`}>
      <div className='cursor-pointer h-full border rounded-md shadow-md mx-2'>
        <div className='p-3'>
          <div className='h-full w-full relative'>
            <Swiper
              slidesPerView={1}
              centeredSlides={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              pagination={{
                clickable: true,
              }}
             
              modules={[Autoplay, Pagination]}
            >
              {img.map((image, index) => (
                <SwiperSlide key={`${_id}-${index}`}>
                   <div className='border overflow-hidden h-40 w-40 flex justify-center items-center'>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_Backend_Url_Image}images/decorator/media/${image}`}
                      alt="img"
                      layout="fill"
                      objectFit="contain"
                     className='object-contain hover:scale-105 transition-transform duration-300 cursor-pointer'
                     loading="lazy"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <h1 className='font-semibold mt-2'>{title}</h1>
          <p className='text-sm'>{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default Decorators;
