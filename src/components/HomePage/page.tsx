/* eslint-disable react/no-unescaped-entities */

import CategoryPage from "./category/CategoryPage";
import Image from "next/image";
import bg from "../../../public/Design_elements/ritual-with-coconut-leaves-during-traditional-hindu-wedding-ceremony 1.png"
import SearchBar from "./SearchBar/SearchBar";
import { Heart } from "lucide-react";

const HomePage: React.FC = () => {
  return (
    <div className="w-full h-full relative ">
      <Image
        className="w-full max-h-full absolute -z-10 "
        alt="Traditional Hindu Wedding Ritual"
        src={bg}
        width={1200}
        height={900}
      />

      <SearchBar />
      <div className="container text-white">
        <div className=" flex items-center justify-center  gap-2 ">
          <h1 className="font-light  text-3xl flex gap-2 text-center ">When your</h1>
          <Heart fill="white" className="w-6 h-6" />
        </div>
        <div className="items-center justify-center">
          <p className="text-center text-4xl font-semibold pb-2">Dream Wedding come true</p>
          <p className="text-center font-light">"once in a while, right in the middle of an</p>
          <p className="text-center font-light">ordinary life, love gives us a fairy tale"</p>
        </div>
      </div>
      <CategoryPage />

    </div>
  );
};

export default HomePage;
