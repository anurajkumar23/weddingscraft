import React from 'react';
import { BanquetColumn } from "./components/columns";
import { BanquetClient } from "./components/client";
import { BanquetDocument } from "@/customTypes/BanquetDocument";

interface BanquetPageDataProps {
  data: BanquetDocument[];
}

const BanquetPageData: React.FC<BanquetPageDataProps> = ({ data }) => {
  
  try {
    const formattedBanquets: BanquetColumn[] = data.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      rating: item.rating,
      location: item.location
        ? `${item.location.city || 'N/A'}, ${item.location.area || 'N/A'}, ${item.location.pincode || 'N/A'}`
        : 'Location not specified',
      description: item.description,
      price: item.price,
      capacity: item.capacity,
      type: item.type,
      yearOfEstd: item.yearOfEstd,
      contactUs: item.contactUs,
      specialFeature: Array.isArray(item.specialFeature) ? item.specialFeature.join(", ") : 'N/A',
      availability: Array.isArray(item.availability) ? item.availability.join(", ") : 'N/A',
      operatingDays: item.operatingDays,
      openHours: item.openHours,
      createdAt: item.createdAt ? new Date(item.createdAt).toISOString().split('T')[0] : "N/A",
    }));

    return (
      <div className="px-4 w-full max-w-screen-xl mx-auto">
        <div className="space-y-4 pt-6">
          <BanquetClient data={formattedBanquets} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error processing banquet data:", error);
    return (
      <div className="px-4 w-full max-w-screen-xl mx-auto">
        <div className="space-y-4 pt-6">
          <p>Error processing banquet data. Please try again later.</p>
        </div>
      </div>
    );
  }
};

export default BanquetPageData;