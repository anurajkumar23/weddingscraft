"use client"

import { Heart, MapPin, Star } from "lucide-react"
import Image from "next/image"
import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CardComponent } from "./InnerCardPage"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import 'swiper/css'
import 'swiper/css/pagination'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import axios from "axios"
import { useAuth } from "@/app/authContext"

interface Location {
  city: string
  pincode: string
  area: string
}

interface InnerPageProps extends CardComponent {
  link: string
  category: string
}

const InnerPage: React.FC<InnerPageProps> = ({
  billboard,
  alt,
  name,
  _id,
  rating,
  description,
  location,
  locationUrl,
  link,
  img,
  imgLink,
  category,
}) => {
  const [isLiked, setIsLiked] = useState(false)
  const { user, setUser } = useAuth();

  const token = localStorage.getItem("jwt_token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    if (user?.wishlist[category] && user?.wishlist[category].length > 0) {  
      const isItemLiked = user.wishlist[category].some((item: any) => item === _id);
      setIsLiked(isItemLiked);
    }
  }, [_id, user?.wishlist[category], user, category]);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const endpoint = isLiked
      ? 'http://localhost:8000/api/user/removewishlist'
      : 'http://localhost:8000/api/user/addwishlist'

    try {
      const response = await axios.patch(endpoint, {
        category,
        itemId: _id,
      }, config)
      if (response.status === 200) {
        setIsLiked(!isLiked)
        setUser(response.data.data.user)
 
      } else {
        console.error('Failed to update wishlist')
      }
    } catch (error) {
      console.error('Error updating wishlist:', error)
    }
  }
  
  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg md:w-3/4 border p-4 bg-slate-50 rounded-md mb-6">
      <CardContent className="p-0">
        <div className="flex w-full relative">
          <Link href={`/${link}/${_id}`} className="md:w-1/3 h-auto">
            {billboard ? (
              <ImageComponent billboard={billboard} alt={alt} imgLink={imgLink} />
            ) : (
              <SwiperComponent img={img} _id={_id} imgLink={imgLink} />
            )}
          </Link>
          <div className="absolute top-2 right-2 flex items-center space-x-2">
            <motion.div
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Heart
                className={`w-6 h-6 cursor-pointer ${isLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                onClick={handleLike}
              />
            </motion.div>
          </div>
          <DetailsSection
            name={name}
            rating={rating}
            description={description}
            location={location}
            locationUrl={locationUrl}
            link={link}
            _id={_id}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4 p-4 bg-gray-50">
        <ActionButtons />
      </CardFooter>
    </Card>
  )
}

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
      className="object-cover md:w-60 md:h-48 w-56 h-40 cursor-pointer rounded-2xl hover:scale-105 transition-transform duration-300"
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
            className="object-cover transition-transform duration-300 hover:scale-105 md:w-60 md:h-48 w-56 h-40 cursor-pointer rounded-2xl"
          />
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
)

interface DetailsSectionProps {
  name: string
  rating: number
  description: string
  location: Location
  locationUrl: string
  link: string
  _id: string
}

const DetailsSection: React.FC<DetailsSectionProps> = ({ name, rating, description, location, locationUrl, link, _id }) => (
  <Link href={`/${link}/${_id}`} className="space-y-2 w-full px-4 pt-6 md:m-3 md:mb-2">
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
  </Link>
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

export default InnerPage
