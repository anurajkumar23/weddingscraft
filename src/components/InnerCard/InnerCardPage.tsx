"use client";
import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import InnerPage from "./page";
// import { getBanquet } from "@/utils/banquet/GetBanquet";

export interface Card {
  _id: string;
  alt: string;
  name: string;
  rating: number;
  description: string;
  location: {
    city: string;
    pincode: string;
    area: string;
  };
  locationUrl: string;
  link: string;
  billboard: string;
  like:[]
}

export interface InnerCardProps{
  banquetData:Card[],
}

const InnerCardPage: React.FC<InnerCardProps> = ({
  banquetData
}) => {


  return (
    <div className="pt-10 w-full">
      <div>
        {banquetData.map((card) => (
          <InnerPage
            key={card._id}
            billboard={card.billboard}
            alt={card.alt}
            like={card.like}
            name={card.name}
            _id={card._id}
            rating={card.rating}
            description={card.description}
            location={card.location}
            locationUrl={card.locationUrl}
            link="BanquetHall"
          />
        ))}
      </div>
    </div>
  );
};

export default InnerCardPage;
