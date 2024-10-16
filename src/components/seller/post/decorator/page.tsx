"use client"

import { useState, useEffect } from "react";
import { DecoratorColumn } from "./components/columns";
import { DecoratorClient } from "./components/client";
import { DecoratorDocument } from "@/customTypes/DecoratorDocument";
import { useAuth } from "@/app/authContext";
import getDecorator from "@/utils/decorator/getDecorator";

const DecoratorPage = () => {
  const [formattedDecorators, setFormattedDecorators] = useState<DecoratorColumn[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchDecorators = async () => {
      try {
        if (user && user.post && user.post.Decorator && user.post.Decorator.length > 0) {
          const decoratorIds = user.post.Decorator;

          console.log(decoratorIds, "Decorator IDs"); // Debugging line

          // Fetch decorator data with the specified decorator IDs
          const decoratorData = await getDecorator(decoratorIds);

          console.log("Fetched Decorator Data:", decoratorData); // Log the fetched data

          // Check if the decorator data is an array and filter out any null entries
          if (Array.isArray(decoratorData)) {
            const validDecoratorData = decoratorData.filter((decorator: any) => decorator !== null);

            const formatted = validDecoratorData.map((item: DecoratorDocument) => ({
              id: item._id.toString(),
              name: item.name,
              description: item.description,
              rating: item.rating,
              location: item.location
                ? `${item.location.city || 'N/A'}, ${item.location.area || 'N/A'}, ${item.location.pincode || 'N/A'}`
                : 'Location not specified',
              price: item.price,
              contactUs: item.contactUs,
              yearOfEstd: item.yearOfEstd,
              billboard: item.billboard,
              photos: item.photos,
            }));

            setFormattedDecorators(formatted);
          } else {
            console.warn("No photographer data found or data format is incorrect");
          }
        }
      } catch (err) {
        setError("Failed to fetch photographer data");
        console.error(err);
      }
    };


    fetchDecorators();
  }, [user]);

  if (error) return <div>Error: {error}</div>;
  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DecoratorClient data={formattedDecorators} />
      </div>
    </div>
  );
};

export default DecoratorPage;