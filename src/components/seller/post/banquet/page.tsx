"use client"
import { useState, useEffect } from "react";
import { BanquetColumn } from "./components/columns";
import { BanquetClient } from "./components/client";
import { BanquetDocument } from "@/customTypes/BanquetDocument";
import { useAuth } from "@/app/authContext";
import getBanquet from "@/utils/banquet/GetBanquet";

const BanquetPageData = () => {
  const [formattedBanquets, setFormattedBanquets] = useState<BanquetColumn[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBanquets = async () => {
      try {
        if (user && user.post && user.post.Banquet && user.post.Banquet.length > 0) {
          const banquetIds = user.post.Banquet; // The array of banquet IDs

          console.log(banquetIds, "Banquet IDs"); // Debugging line

          // Fetch banquet data with the specified banquet IDs
          const banquetData = await getBanquet(banquetIds);

          console.log("Fetched Banquet Data:", banquetData); // Log the fetched data

          // Check if the banquet data is an array and filter out any null entries
          if (Array.isArray(banquetData)) {
            const validBanquetData = banquetData.filter((banquet: any) => banquet !== null);

            const formatted = validBanquetData.map((item: BanquetDocument) => ({
              id: item._id.toString(),
              name: item.name,
              rating: item.rating,
              location: item.location
                ? `${item.location.city || "N/A"}, ${item.location.area || "N/A"}, ${item.location.pincode || "N/A"}`
                : "Location not specified",
              description: item.description,
              price: item.price,
              capacity: item.capacity,
              type: item.type,
              yearOfEstd: item.yearOfEstd,
              contactUs: item.contactUs,
              specialFeature: item.specialFeature.join(", "),
              availability: item.availability.join(", "),
              operatingDays: item.operatingDays,
              openHours: item.openHours,
              createdAt: item.createdAt ? new Date(item.createdAt).toISOString().split("T")[0] : "N/A",
            }));

            setFormattedBanquets(formatted);
          } else {
            console.warn("No photographer data found or data format is incorrect");
          }
        }
      } catch (err) {
        setError("Failed to fetch photographer data");
        console.error(err);
      }
    };

    fetchBanquets();
  }, [user]);


  if (error) return <div>Error: {error}</div>;

  return (
    <div className="px-4 w-full max-w-screen-xl mx-auto">
      <div className="space-y-4 pt-6">
        <BanquetClient data={formattedBanquets} />
      </div>
    </div>
  );
};

export default BanquetPageData;
