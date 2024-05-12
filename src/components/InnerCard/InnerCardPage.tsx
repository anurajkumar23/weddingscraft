"use client";
import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import InnerPage from "./page";
import { getBanquet } from "@/utils/banquet/GetBanquet";

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

const InnerCardPage: React.FC = () => {
  const [banquetData, setBanquetData] = useState<Card[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBanquet();
        if (data && data.data && data.data.banquet) {
          setBanquetData(data.data.banquet);
        }
      } catch (error) {
        console.error("Error fetching banquet data:", error);
      }
    }
    fetchData();
  }, []);

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
