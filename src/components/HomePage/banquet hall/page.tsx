import Card from "@/components/Card";
import Banquet1 from "../../../../public/Banquet-1.jpg";
import Banquet2 from "../../../../public/Banquet-2.jpg";
import Catering from "../../../../public/cattering.jpg";
import Photographer from "../../../../public/Photographer.jpeg";
import banquetBg from "../../../../public/Design_elements/Frame 5052.png";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const BanquetPage: React.FC = () => {
  // Ensure unique IDs
  const Banquet = [
    { id: "1", src: Banquet1, alt: "Banquet", title: "Banquet Halls" },
    { id: "2", src: Banquet2, alt: "Decorators", title: "Decorators" },
    { id: "3", src: Catering, alt: "Catering", title: "Caterers" },
    { id: "4", src: Photographer, alt: "Photographer", title: "Photographers" },
    { id: "1", src: Banquet1, alt: "Banquet", title: "Banquet Halls" },
    { id: "2", src: Banquet2, alt: "Decorators", title: "Decorators" },
    { id: "3", src: Catering, alt: "Catering", title: "Caterers" },
    { id: "4", src: Photographer, alt: "Photographer", title: "Photographers" },
  ];

  return (
    <div className="pt-10">
      <div className="relative w-full h-full min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={banquetBg}
            alt="Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="z-0"
          />
        </div>

        {/* Overlay content */}
        <div className="relative z-10 py-16 px-6">
          <h1 className="font-semibold text-3xl text-center mb-10">Banquet Halls</h1>
          <div className="mx-6 flex">
            <div className="container gap-12 grid w-auto lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {Banquet.map((card) => (
              <Card key={card.id} img={card.src} alt={card.alt} title={card.title} />
            ))}
            </div>
            </div>
            {/* View All Button */}
        <div className="flex justify-center mt-12">
          <button className="flex items-center gap-2 text-lg font-semibold text-red-600 hover:text-red-700 transition-all">
            View All
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default BanquetPage;
