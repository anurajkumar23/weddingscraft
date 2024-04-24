"use client"
import React from 'react'
import phot1 from "../../../public/engagement-wishes-for-friend.jpg"
import Card from "@/components/photographers/card"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Photographs = [
  { id: "1", src: phot1, alt: "Engagement", title: "Engagement", description: "Full Engagement + Album Shoot", Price: 3000 },
  { id: "2", src: phot1, alt: "Pre-wedding", title: "Pre wedding", description: "Full Engagement + Album Shoot", Price: 3000 },
  { id: "3", src: phot1, alt: "Engagement", title: "Engagement", description: "Full Engagement + Album Shoot", Price: 3000 },
  { id: "4", src: phot1, alt: "Engagement", title: "Engagement", description: "Full Engagement + Album Shoot", Price: 3000 },
  { id: "5", src: phot1, alt: "Engagement", title: "Engagement", description: "Full Engagement + Album Shoot", Price: 3000 },
  { id: "6", src: phot1, alt: "Engagement", title: "Engagement", description: "Full Engagement + Album Shoot", Price: 3000 },
  // { id: "2", src: Banquet2, alt: "Banquet", title: "Decorators" },
  // { id: "3", src: Catering, alt: "Catering", title: "Caterers" },
  // { id: "4", src: Photographer, alt: "Photographer", title: "Photographers" }
];
const page = () => {

  return (
    <div className='w-full flex py-20'>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        centeredSlides={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper mySlider"
        breakpoints={{

          320: {
            slidesPerView: 2,
          },

          // When window width is <= 640px
          640: {
            slidesPerView: 4,
          },
          // When window width is <= 768px
          768: {
            slidesPerView: 5,
          },
          // When window width is <= 1024px
          1024: {
            slidesPerView: 6,
          },
        }}
      // style={customStyle}
      >
        <div className=''>
          {Photographs.map((card) => (
            <SwiperSlide key={card.id} >
              <Card
                key={card.id}
                img={card.src} // Change here
                alt={card.alt}
                title={card.title}
                description={card.description}
                Price={card.Price}
              />
            </SwiperSlide>
          ))}
        </div>
        <div className="swiper-button-next bg-purple-400 p-6 rounded-full shadow-2xl cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      {/* Custom Tailwind CSS previous button */}
      <div className="swiper-button-prev bg-purple-400 p-6 rounded-full shadow-2xl cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-1 w-1" fill="none" viewBox="0 0 15 15" stroke="white">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      </Swiper>
    </div>
  )
}

export default page
