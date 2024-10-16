"use client"

import { useState, useEffect } from "react";
import { PhotographerColumn } from "./components/columns";
import { PhotographerClient } from "./components/client";
import { PhotographerDocument } from "@/customTypes/PhotographerDocument";
import { useAuth } from "@/app/authContext";
import getPhotographer from "@/utils/Photographer/GetPhotographer";

const PhotographerPage = () => {
  const [formattedPhotographers, setFormattedPhotographers] = useState<PhotographerColumn[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        if (user && user.post && user.post.Photographer && user.post.Photographer.length > 0) {
          const photographerIds = user.post.Photographer;

          console.log(photographerIds, "Photographer IDs"); // Debugging line

          // Fetch photographer data with the specified photographer IDs
          const photographerData = await getPhotographer(photographerIds);

          console.log("Fetched Photographer Data:", photographerData); // Log the fetched data

          // Check if the photographer data is an array and filter out any null entries
          if (Array.isArray(photographerData)) {
            const validPhotographerData = photographerData.filter((photographer: any) => photographer !== null);

            const formatted = validPhotographerData.map((item: PhotographerDocument) => ({
              id: item._id.toString(),
              name: item.name,
              rating: item.rating,
              location: item.location
                ? `${item.location.city || 'N/A'}, ${item.location.area || 'N/A'}, ${item.location.pincode || 'N/A'}`
                : 'Location not specified',
              locationUrl: item.locationUrl || 'N/A',
              description: item.description || 'No description',
              price: item.price.length ? item.price.join(", ") : 'No prices listed',
              contactUs: item.contactUs || 'N/A',
              yearOfEstd: item.yearOfEstd || 'N/A',
              services: item.services.length ? item.services.join(", ") : 'No services listed',
              occasion: item.occasion || 'N/A',
              gallery: item.gallery.length 
                ? item.gallery.map(galleryItem => `${galleryItem.name}: ${galleryItem.photos.join(", ")}`).join(" | ") 
                : 'No gallery available',
              photos: item.photos.length ? item.photos.join(", ") : 'No photos',
              createdAt: item.createdAt ? new Date(item.createdAt).toISOString().split('T')[0] : "N/A",
            }));

            setFormattedPhotographers(formatted);
          } else {
            console.warn("No photographer data found or data format is incorrect");
          }
        }
      } catch (err) {
        setError("Failed to fetch photographer data");
        console.error(err);
      }
    };

    fetchPhotographers();
  }, [user]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PhotographerClient data={formattedPhotographers} />
      </div>
    </div>
  );
};

export default PhotographerPage;