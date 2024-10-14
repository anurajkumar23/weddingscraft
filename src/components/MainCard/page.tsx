"use client";
import { MapPin, MapPinned, PhoneCall } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { FaWhatsapp } from "react-icons/fa";
import QuickInfo from "./QuickInfo";
import Link from "next/link";
import ReviewRating from "../Review&Rating/Review&Rating";
import ImageGallery from "../Gallery/ImageGallery";
export interface BanquetVenue {
  location: {
    city: string;
    pincode: string;
    area: string;
  };
  _id: string;
  photo: string[]; // Assuming photo URLs are strings
  name: string;
  rating: number;
  locationUrl?: {
    coordinates: number[];
    url: string;
  };
  description: string;
  price: number;
  like: Like[]; // Define the type for like array based on its content
  capacity: number;
  specialFeature: string[];
  yearOfEstd: number;
  services: string[];
  type: string;
  availability: string[];
  billboard: string;
  openHours: string;
  operatingDays: string;
  reviews: Review[]; // Define the type for reviews array based on its content
  gallery: {
    name: string;
    photos: string[]; // Assuming gallery URLs are strings
    _id: string;
  }[];
  __v: number;
}

// Example types for 'like' and 'review' arrays
interface Like {
  userId: string;
  timestamp: Date;
}

interface Review {
  userId: string;
  comment: string;
  rating: number;
  date: Date;
}

interface BanquetProps {
  banquetData: BanquetVenue;
}

const MainCardPage: React.FC<BanquetProps> = ({ banquetData }) => {
  const [showMap, setShowMap] = useState(true);
  if (!banquetData) {
    return <div>Loading...</div>;
  }
  const { location, name, rating, locationUrl, price, description, _id } = banquetData;
  // // eslint-disable-next-line react-hooks/rules-of-hooks, react-hooks/rules-of-hooks

  function convertEmbedUrlToNormalUrl(url: string) {
    // Improved regex to match latitude and longitude in any order
    const regex = /!2d([0-9.\-]+)!3d([0-9.\-]+)/;
    const match = url.match(regex);

    if (match && match.length === 3) {
      const longitude = match[1];
      const latitude = match[2];

      // Construct the normal Google Maps URL with a pinpoint marker
      return `https://www.google.com/maps?q=${latitude},${longitude}&z=15&hl=en`;
    }

    return null;
  }

  // console.log(banquetData,"banquetData")
  let normalUrl;
  if (locationUrl?.url) {
    normalUrl = convertEmbedUrlToNormalUrl(locationUrl?.url);
  }

  return (
    <div className="h-full grid md:grid-cols-12 gap-2">
      <div className="md:col-span-8 ">
        <div>
          <div className="relative">
            <ImageGallery categoryId={_id} category='banquet' />
          </div>
          <div className="relative bottom-20 mx-4 bg-white rounded-sm p-4 shadow-xl border">
            <div className="flex justify-between items-center pb-2">
              <strong className="font-medium md:text-lg text-base">
                {name}{" "}
              </strong>
              <div className="flex gap-x-2 items-center">
                <span className="border p-1 rounded-sm bg-green-600 text-white">
                  {rating}
                </span>
                <h1 className="text-gray-600">Rating</h1>
              </div>
            </div>
            <div className="flex items-center mb-2">
              <MapPin className="mr-2" />
              {location ? (
                <>
                  <p>{location.city},</p>
                  <p>{location.area},</p>
                  <p>{location.pincode}</p>
                </>
              ) : (
                <p>No location information available</p>
              )}
              <Link
                href={`${normalUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="border text-red-600 border-red-500 hover:bg-red-600 hover:text-white ml-4 p-1 rounded-sm font-sans cursor-pointer">
                  View on Map
                </button>
              </Link>
            </div>
            <div className='mb-4'>
              <h2 className='font-semibold mb-2'>Details:</h2>
              <p className='text-gray-600'>{description}</p>
            </div>
            {normalUrl && (
              <div className="mb-4">
                <Button
                  variant="outline"
                  onClick={() => setShowMap(!showMap)}
                  className="w-full md:w-auto"
                >
                  {showMap ? 'Hide Map' : 'Show Map'}
                </Button>
              </div>
            )}
            {showMap && banquetData.locationUrl?.url && (
              <div className="aspect-video w-full">
                <iframe
                  src={banquetData.locationUrl.url}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            )}
            <Button
              className="mr-2 mb-2 mt-2 gap-x-2 bg-green-600 hover:bg-green-700 hover:text-white text-white text-base"
              variant="outline"
            >
              <PhoneCall />
              Contact Us
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden md:block border-2 rounded-sm md:col-span-4 p-2 pb-6">
        <div className="pb-4">
          <div className="border w-full shadow-md p-4 cursor-pointer rounded-sm">
            <p className="text-red-600 text-2xl font-semibold pb-4 ">
              Starting Price
            </p>
            <hr />
            <div className="flex gap-x-2">
              <p className="text-gray-600">Starting Price : </p>
              <p> ₹ {price}</p>
            </div>
          </div>
          <div className="pt-4">
            <div className="border p-4 shadow-md">
              <p className="text-2xl font-semibold text-red-600 "> Caterers</p>
              <hr />
              <div className="p-2">
                <div className="flex justify-between text-center">
                  <span className="relative flex gap-2">
                    <li>₹700 Per plate</li>
                    <p className="text-xs flex items-center text-gray-500">
                      (taxes Extra){" "}
                    </p>
                  </span>
                  <p>Veg Plate</p>
                </div>
                <div className="flex justify-between">
                  <span className="relative flex gap-2">
                    <li>₹900 Per plate</li>
                    <p className="text-xs flex items-center text-gray-500">
                      (taxes Extra){" "}
                    </p>
                  </span>
                  <p>Non Veg Plate</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border w-full shadow-md p-4 cursor-pointer rounded-sm">
            <p className="text-red-600 text-2xl font-semibold pb-4 ">
              Decorators
            </p>
            <hr />
            <div className="flex gap-2">
              <p className="text-gray-600">Starting Price : </p>
              <p className="text-gray-400"> ₹ 15,000</p>
            </div>
          </div>
          <div className="border w-full shadow-md p-4 cursor-pointer rounded-sm">
            <p className="text-red-600 text-2xl font-semibold pb-4 ">
              Photographers
            </p>
            <hr />
            <div className="flex gap-2">
              <p className="text-gray-600">Starting Price : </p>
              <p className="text-gray-400"> ₹ 15,000</p>
            </div>
          </div>
        </div>
        <div className="justify-center flex gap-4">
          <Button
            className="p-6 gap-2 shadow-lg font-medium md:text-base text-sm"
            variant="outline"
          >
            <FaWhatsapp className="text-green-500 w-7 h-7" />
            Check availability
          </Button>
          <Button
            className="font-medium md:text-base text-sm p-6 gap-2 shadow-lg bg-green-600 hover:bg-green-700 hover:text-white text-white"
            variant="outline"
          >
            <PhoneCall />
            Pricing
          </Button>
        </div>
      </div>
      <div className="md:col-span-8">
        <QuickInfo banquetData={banquetData} />
        
      </div>
    </div>
  );
};

export default MainCardPage;
