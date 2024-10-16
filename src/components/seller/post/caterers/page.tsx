"use client"

import { useState, useEffect } from "react";
import { CatererColumn } from "./components/columns";
import { CatererClient } from "./components/client";
import { CatererDocument, SectionDocument } from "@/customTypes/CatererDocument";
import { useAuth } from "@/app/authContext";
import getCaterer from "@/utils/caterer/GetCaterer";

const formatMenu = (menu: SectionDocument['veg'] | SectionDocument['nonveg'] = {
  starter: [],
  maincourse: [],
  desert: [],
  welcomedrink: [],
  breads: [],
  rice: [],
}) => ({
  starter: menu.starter?.join(", ") ?? "",
  maincourse: menu.maincourse?.join(", ") ?? "",
  desert: menu.desert?.join(", ") ?? "",
  welcomedrink: menu.welcomedrink?.join(", ") ?? "",
  breads: menu.breads?.join(", ") ?? "",
  rice: menu.rice?.join(", ") ?? "",
});

const formatAddons = (addons: SectionDocument['addon'] = {
  starter: [],
  maincourse: [],
  desert: [],
  welcomedrink: [],
  breads: [],
  rice: [],
}) => ({
  starter: addons.starter?.map((addon) => `${addon.name} - ${addon.price}`).join(", ") ?? "",
  maincourse: addons.maincourse?.map((addon) => `${addon.name} - ${addon.price}`).join(", ") ?? "",
  desert: addons.desert?.map((addon) => `${addon.name} - ${addon.price}`).join(", ") ?? "",
  welcomedrink: addons.welcomedrink?.map((addon) => `${addon.name} - ${addon.price}`).join(", ") ?? "",
  breads: addons.breads?.map((addon) => `${addon.name} - ${addon.price}`).join(", ") ?? "",
  rice: addons.rice?.map((addon) => `${addon.name} - ${addon.price}`).join(", ") ?? "",
});

const formatSection = (section: SectionDocument | undefined) => ({
  vegMenu: formatMenu(section?.veg),
  nonVegMenu: formatMenu(section?.nonveg),
  addons: formatAddons(section?.addon),
  price: section?.price?.[0] ?? 0,
});

const CatererPage = () => {
  const [formattedCaterers, setFormattedCaterers] = useState<CatererColumn[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCaterers = async () => {
      try {
        if (user && user.post && user.post.Caterer && user.post.Caterer.length > 0) {
          const catererIds = user.post.Caterer;

          const catererData = await getCaterer(catererIds);

          console.log("Fetched Caterer Data:", catererData); // Log the fetched data

          // Check if the caterer data is an array and filter out any null entries
          if (Array.isArray(catererData)) {
            const validCatererData = catererData.filter((caterer: any) => caterer !== null);

            const formatted = validCatererData.map((item: CatererDocument) => ({
              id: item._id.toString(),
              name: item.name,
              description: item.description ?? "",
              rating: item.rating,
              reviews: item.reviews?.map(review => ({
                user: review.user,
                comment: review.comment,
                rating: review.rating,
                date: review.date.toISOString(),
              })) ?? [],
              like: item.like ?? [],
              contactUs: item.contactUs,
              yearOfEstd: item.yearOfEstd ?? 0,
              billboard: item.billboard ?? "",
              photos: item.photos ?? [],
              basic: formatSection(item.basic),
              standard: formatSection(item.standard),
              deluxe: formatSection(item.deluxe),
            }));

            setFormattedCaterers(formatted);
          } else {
            console.warn("No photographer data found or data format is incorrect");
          }
        }
      } catch (err) {
        setError("Failed to fetch photographer data");
        console.error(err);
      }
    };

    fetchCaterers();
  }, [user]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CatererClient data={formattedCaterers} />
      </div>
    </div>
  );
};

export default CatererPage;