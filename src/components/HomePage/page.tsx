/* eslint-disable react/no-unescaped-entities */
import CategoryPage from "./category/CategoryPage";
import Image from "next/image";
import bg from "../../../public/ritual-with-coconut-leaves-during-traditional-hindu-wedding-ceremony-1.webp"
import SearchBar from "./SearchBar/SearchBar";
import { Heart } from "lucide-react";
import { Metadata } from "next";
import searchAll from "@/utils/GlobalSearch/GlobalSearch";

type Props = {
  searchParams: { q: string }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const query = searchParams.q || ''
  return {
    title: query ? `Search Results for "${query}" | Dream Wedding` : 'Dream Wedding - Find Your Perfect Wedding Services',
    description: query 
      ? `Find the best wedding venues, caterers, decorators, and photographers for "${query}" in Patna and surrounding areas.`
      : 'Discover top wedding venues, caterers, decorators, and photographers in Patna. Plan your dream wedding with ease.',
    openGraph: {
      title: query ? `Search Results for "${query}" | Dream Wedding` : 'Dream Wedding - Your One-Stop Wedding Planning Solution',
      description: query
        ? `Discover top wedding services for "${query}" in Patna. Find venues, caterers, decorators, and photographers for your perfect wedding.`
        : "Find and book the best wedding services in Patna. From venues to photographers, we've got you covered.",
    },
  }
}

export default async function HomePage ({ searchParams }: Props)  {
  const query = searchParams.q || ''
  const results = query ? await searchAll(query) : {}

  return (
    <div className="w-full h-full relative">
      <Image
        className="w-full max-sm:object-cover min-h-full md:max-h-full absolute -z-10"
        alt="Traditional Hindu Wedding Ritual"
        src={bg}
        loading="lazy"
        width={1200}
        height={900}
      />

      <SearchBar initialQuery={query} initialResults={results} />
      <div className="container mx-auto px-4 text-white">
        <div className="flex md:flex-row items-center justify-center gap-2 md:gap-4">
          <h1 className="font-light text-2xl md:text-3xl text-center">When your</h1>
          <Heart fill="white" className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className="flex flex-col items-center justify-center md:mt-4">
          <p className="text-center text-2xl md:text-4xl font-semibold pb-2">Dream Wedding come true</p>
          <p className="text-center text-sm md:text-base font-light">"once in a while, right in the middle of an</p>
          <p className="text-center text-sm md:text-base font-light">ordinary life, love gives us a fairy tale"</p>
        </div>
      </div>
      <CategoryPage />
    </div>
  );
};