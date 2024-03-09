import Card from "@/components/Card";
import Banquet1 from "../../../../public/Banquet-1.jpg";
import Banquet2 from "../../../../public/Banquet-2.jpg";
import Catering from "../../../../public/cattering.jpg";
import Photographer from "../../../../public/Photographer.jpeg";

const BanquetPage: React.FC = () => {
  const Banquet = [
    { id: "1", src: Banquet1, alt: "Banquet", title: "Banquet Halls" },
    { id: "2", src: Banquet2, alt: "Banquet", title: "Decorators" },
    { id: "3", src: Catering, alt: "Catering", title: "Caterers" },
    { id: "4", src: Photographer, alt: "Photographer", title: "Photographers" }
];

  return (
    <div className="pt-10">
      <h1 className="px-10 font-semibold text-2xl">Banquet Halls</h1>
    <div className='w-auto px-8 mt-5 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6'>
      
     {Banquet.map((card) =>(

     <Card
     key={card.id}
     img={card.src} // Change here
     alt={card.alt}
     title={card.title}
     />
     ))}
    </div>
    </div>
  );
};

export default BanquetPage;
