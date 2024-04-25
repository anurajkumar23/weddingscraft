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
  { id: "7", src: phot1, alt: "Engagement", title: "Engagement", description: "Full Engagement + Album Shoot", Price: 3000 },
  { id: "8", src: phot1, alt: "Engagement", title: "Engagement", description: "Full Engagement + Album Shoot", Price: 3000 },
  // { id: "2", src: Banquet2, alt: "Banquet", title: "Decorators" },
  // { id: "3", src: Catering, alt: "Catering", title: "Caterers" },
  // { id: "4", src: Photographer, alt: "Photographer", title: "Photographers" }
];
const page = () => {

  return (
    <div className='w-full flex py-20 relative'>
      <div className="absolute inset-0 h-full w-full bg-white -z-10 ">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_40%_500px,#d5c5ff,transparent)]"></div>
      </div>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="swipper-container"
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
        <div className="swiper-button-next  bg-purple-400 p-6 rounded-full shadow-2xl cursor-pointer">
        
      </div>
     
      <div className="swiper-button-prev swiper-button-white bg-purple-400 p-6 rounded-full shadow-2xl cursor-pointer">
        
      </div>
      </Swiper>
    </div>
  )
}

export default page
