import React from 'react'
import Banquet1 from "../../../public/Banquet-1.jpg";
import Banquet2 from "../../../public/Banquet-2.jpg";
import Catering from "../../../public/cattering.jpg";
import Photographer from "../../../public/Photographer.jpeg";
import Image from 'next/image';
import InnerPage from './page';


const InnerCardPage: React.FC = () => {

    const Banquet = [
        { id: "1", src: Banquet1, alt: "Banquet", title: "Banquet Halls", links:"BanquetHall"},
        { id: "2", src: Banquet1, alt: "Banquet", title: "Banquet Halls", links:"BanquetHall"},
        // { id: "2", src: Banquet2, alt: "Banquet", title: "Decorators" },
        // { id: "3", src: Catering, alt: "Catering", title: "Caterers" },
        // { id: "4", src: Photographer, alt: "Photographer", title: "Photographers" }
    ];

  return (
    <div className="pt-10 w-full">
  <div>
    
   {Banquet.map((card) =>(

   <InnerPage
   key={card.id}
   img={card.src} // Change here
   alt={card.alt}
   title={card.title}
   id={card.id}
   link={card.links}
   />
   ))}
  </div>
  </div>
  )
}

export default InnerCardPage
