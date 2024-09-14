"use client"
import { Heart, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Card } from "./InnerCardPage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';

const InnerPage: React.FC<Card & { link: string }> = ({
  billboard,
  alt,
  name,
  _id,
  rating,
  description,
  location,
  locationUrl,
  link,
  like,
  img,
  imgLink,
}) => {
  return (
    <Link href={`/${link}/${_id}`} key={_id}>
      <div className="md:w-3/4 border p-4 bg-slate-100 rounded-md mb-6">
        <div className="flex">
          {billboard ? (
            <ImageComponent billboard={billboard} alt={alt} imgLink={imgLink}/>
          ) : (
            <SwiperComponent img={img} _id={_id} imgLink={imgLink}/>
          )}
          <DetailsSection
            name={name}
            rating={rating}
            description={description}
            location={location}
            locationUrl={locationUrl}
            likeCount={like.length}
          />
        </div>
        <div className="pt-3 flex md:justify-center">
          <ActionButtons />
        </div>
      </div>
    </Link>
  );
};

export default InnerPage;

// Separated Image Component
const ImageComponent: React.FC<{ billboard: string; alt: string, imgLink:string }> = ({
  billboard,
  alt,
  imgLink,
}) => (
  <Image
    src={`${process.env.NEXT_PUBLIC_Backend_Url_Image}images/${imgLink}/${billboard}`}
    alt={alt}
    width={400}
    height={300}
    loading="lazy"
    className="object-cover md:w-60 md:h-60 sm:w-60 sm:h-64 w-48 h-56 cursor-pointer rounded-2xl hover:scale-105 transition-transform duration-300"
  />
);

// Separated Swiper Component
const SwiperComponent: React.FC<{ img: string[]; _id: string , imgLink: string}> = ({ img, _id , imgLink}) => (
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
      <div className="flex justify-center ">
        <Image
          src={`${process.env.NEXT_PUBLIC_Backend_Url_Image}images/${imgLink}/media/${image}`}
          alt="img"
          width={400}
          height={300}
          loading="lazy"
          className="object-cover md:w-60 md:h-60 sm:w-60 sm:h-64 w-48 h-56 cursor-pointer rounded-2xl hover:scale-105 transition-transform duration-300"
        />
      </div>
    </SwiperSlide>
  ))}
</Swiper>

);

// Separated Details Section
const DetailsSection: React.FC<{
  name: string;
  rating: number;
  description: string;
  location: {
    city: string;
    pincode: string;
    area: string;
  };
  locationUrl: string;
  likeCount: number;
}> = ({ name, rating, description, location, locationUrl, likeCount }) => (
  <div className="w-full px-4 m-3 mb-2">
    <div className="flex justify-between">
      <h1 className="text-xl font-medium mb-2">{name}</h1>
      <Heart className="cursor-pointer" />
      <p>{likeCount} Likes</p>
    </div>
    <div className="flex gap-x-2 items-center pb-2">
      <span className="border p-1 rounded-sm bg-green-600 text-white">{rating}</span>
      <h1 className="text-gray-600">Ratings</h1>
    </div>
    <div className="flex items-center mb-2">
      <Link href={`${locationUrl}`}>
        <MapPin className="mr-2" />
      </Link>
      <span className="text-gray-600">Location: </span>
      {location ? (
        <span>
          <p>{location.city}, {location.area}, {location.pincode}</p>
        </span>
      ) : (
        <p>No location information available</p>
      )}
    </div>
    <h1>Details: {description}</h1>
  </div>
);

// Separated Action Buttons Component
const ActionButtons: React.FC = () => (
  <>
    <Button className="mr-2 mb-2 bg-green-600 hover:bg-green-700 text-white text-base">
      Request Pricing
    </Button>
    <Button className="bg-blue-600 hover:bg-blue-700 text-white text-base">
      For more details
    </Button>
  </>
);
