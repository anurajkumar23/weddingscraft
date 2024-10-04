/* eslint-disable react/no-unescaped-entities */
import CategoryPage from "./category/CategoryPage";
import Image from "next/image";
import bg from "../../../public/ritual-with-coconut-leaves-during-traditional-hindu-wedding-ceremony-1.webp"
import SearchBar from "./SearchBar/SearchBar";
import { Heart } from "lucide-react";

const HomePage: React.FC = () => {
  return (
    <div className="w-full h-full relative">
      <Image
        className="w-full max-sm:object-cover  min-h-full md:max-h-full absolute -z-10"
        alt="Traditional Hindu Wedding Ritual"
        src={bg}
        loading="lazy"
        width={1200}
        height={900}
      />

      <SearchBar />
      <div className="container mx-auto px-4 text-white">
        <div className="flex  md:flex-row items-center justify-center gap-2 md:gap-4">
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

export default HomePage;
