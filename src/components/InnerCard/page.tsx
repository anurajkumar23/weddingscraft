import { Heart, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Card } from "./InnerCardPage";

const InnerPage: React.FC<Card> = ({
  billboard,
  alt,
  name,
  _id,
  rating,
  description,
  location,
  locationUrl,
  link,
  like
}) => {
  return (
    <div>
      <Link href={`/${link}/${_id}`} key={_id}>
        <div className="mb-6 md:w-3/4 border p-4 bg-slate-100 rounded-md">
          <div className="flex">
            <Image
              src={`${process.env.NEXT_PUBLIC_Backend_Url_Image}images/banquet/${billboard}`}
              alt={alt}
              width={400}
              height={300}
              loading='lazy'
              className="object-cover md:w-60 md:h-60 sm:w-60 sm:h-64 w-48 h-56 cursor-pointer rounded-2xl"
            />
            <div className="w-full px-4 m-3 mb-2">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium mb-2">{name}</h1>
                <Heart className="cursor-pointer" />
                <p>{like.length} Likes</p>
              </div>
              <div className="flex gap-x-2 items-center pb-2">
                <span className="border p-1 rounded-sm bg-green-600 text-white">
                  {rating}
                </span>
                <h1 className="text-gray-600">Ratings</h1>
              </div>
              <div className="flex items-center mb-2">
                <Link href={`${locationUrl}`}>
                  <MapPin className="mr-2" />
                </Link>
                <span className="text-gray-600">Location: </span>
                {location ? (
                  <>
                    <p>{location.city},</p>
                    <p>{location.area},</p>
                    <p>{location.pincode}</p>
                  </>
                ) : (
                  <p>No location information available</p>
                )}
              </div>
              <h1>Details: {description}</h1>
            </div>
          </div>
          <div className="pt-3 flex md:justify-center">
            <Button
              className="mr-2 mb-2 bg-green-600 hover:bg-green-700 hover:text-white text-white text-base"
              variant="outline"
            >
              Request Pricing
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 hover:text-white text-white text-base"
              variant="outline"
            >
              For more details
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default InnerPage;
