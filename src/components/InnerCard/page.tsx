"use client"
import { Heart, MapPin, Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { CardComponent } from "./InnerCardPage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const InnerPage: React.FC<CardComponent & { link: string }> = ({
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
    <Link href={`/${link}/${_id}`} className="block w-full">
      <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg md:w-3/4 border p-4 bg-slate-50 rounded-md mb-6">
        <CardContent className="p-0">
          <div className="flex w-full relative">
            <div className="md:w-1/3 h-auto">
              {billboard ? (
                <ImageComponent billboard={billboard} alt={alt} imgLink={imgLink} />
              ) : (
                <SwiperComponent img={img} _id={_id} imgLink={imgLink} />
              )}

            </div>
            <div className="absolute top-0 right-0 flex items-center ml-0 space-x-2">
              <Heart className="w-5 h-5 text-red-500 cursor-pointer" />
              <span className="text-sm text-gray-600">{like.length} Likes</span>
            </div>
            <DetailsSection
              name={name}
              rating={rating}
              description={description}
              location={location}
              locationUrl={locationUrl}

            />

          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4 p-4 bg-gray-50">
          <ActionButtons />
        </CardFooter>
      </Card>
    </Link>
  );
};

export default InnerPage;

const ImageComponent: React.FC<{ billboard: string; alt: string; imgLink: string }> = ({
  billboard,
  alt,
  imgLink,
}) => (
  <div className="relative w-full md:h-full">
    <Image
      src={`${process.env.NEXT_PUBLIC_Backend_Url_Image}images/${imgLink}/${billboard}`}
      alt={alt}
      width={500}
      height={500}
      objectFit="cover"
      className="object-cover md:w-60 md:h-48  w-56 h-40 cursor-pointer rounded-2xl hover:scale-105 transition-transform duration-300"
    />
  </div>
)

const SwiperComponent: React.FC<{ img?: string[]; _id: string; imgLink: string }> = ({ img, _id, imgLink }) => (
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
 className="max-w-60 max-h-80"
  >
    {img?.map((image, index) => (
      <SwiperSlide key={`${_id}-${index}`}>
        <div className="flex">
          <Image
            src={`${process.env.NEXT_PUBLIC_Backend_Url_Image}images/${imgLink}/media/${image}`}
            alt={`Image ${index + 1}`}
            width={500}
            height={500}
            objectFit="cover"
          className="object-cover transition-transform duration-300 hover:scale-105 md:w-60 md:h-48  w-56 h-40 cursor-pointer rounded-2xl"
          />
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
)

const DetailsSection: React.FC<{
  name: string
  rating: number
  description: string
  location: {
    city: string;
    pincode: string;
    area: string;
  };
  locationUrl: string
}> = ({ name, rating, description, location, locationUrl }) => (
  <div className=" space-y-2 w-full px-4 pt-6 md:m-3 md:mb-2">
    <div className="flex justify-between items-center">

      <CardTitle className="text-base md:text-xl font-semibold">{name}</CardTitle>
    </div>
    <div className="flex items-center space-x-2">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <span className="text-sm text-gray-500">{rating.toFixed(1)}</span>
    </div>
    <p className="md:text-sm text-xs text-gray-500 line-clamp-2">{description}</p>
    <div className="flex items-center space-x-2">
      <MapPin className="w-4 h-4 text-black" />
      <Link href={`${locationUrl}`} className="text-sm text-blue-600 hover:underline">
        {location ? `${location.city}, ${location.area}, ${location.pincode}` : 'Location unavailable'}
      </Link>
    </div>
  </div>
)

const ActionButtons: React.FC = () => (
  <>
    <Button className="bg-green-600 hover:bg-green-700 text-white">
      Request Pricing
    </Button>
    <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
      More Details
    </Button>
  </>
)

