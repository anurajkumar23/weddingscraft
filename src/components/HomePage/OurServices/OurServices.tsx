import Image from 'next/image';
import Banquet1 from "../../../../public/Design_elements/7xm.png";
import Glasses from "../../../../public/Design_elements/befunky_layer(5) 1-1.png";
import ProtocolServices from "../../../../public/Design_elements/WhatsApp Image 2022-09-14 at 10.42 1.png";
import Food_and_Beverages from "../../../../public/Design_elements/7xm 3.png";
import Catering from "../../../../public/Design_elements/7xm-1.png";
import Video_and_photography from "../../../../public/Design_elements/90995996_128083545439332_7013442743687523284_n.png";

import Card from './Card';

const OurServices = () => {
  const Banquet = [
    { id: "1", src: Banquet1, alt: "Banquet", title: "Event Planning", desc: "We bring your ideas to life with expert event planning, ensuring every detail is perfect for your event." },
    { id: "2", src: ProtocolServices, alt: "Protocol Services", title: "Protocol Service", desc: "We have a team of loyal, professional experts who specialize in protocol so, No matter what type of event you are hosting, we can serve you." },
    { id: "3", src: Food_and_Beverages, alt: "Food and Beverages", title: "Food and Beverages", desc: "Our chefs and bartenders are dedicated to providing you with the highest quality cuisine and service." },
    { id: "4", src: Catering, alt: "Outside Catering", title: "Outside Catering", desc: "We're dedicated to providing our clients with top-quality outside catering services." },
    { id: "5", src: Video_and_photography, alt: "Video and Photography", title: "Video and Photography", desc: "We also specialize in high quality, High definition video and photography services that will make your event unforgettable." },
  ];

  return (
    <div className="py-12 max-w-full bg-gray-50">
      {/* Section Heading */}
      <h1 className="text-center text-4xl font-semibold text-gray-800">
        We Provide The <span className="text-red-500">Following Services</span>
      </h1>
      
      {/* Section Divider */}
      <div className="flex gap-x-4 justify-center items-center pt-4">
        <hr className="w-24 border-gray-400 border-2" />
        <Image src={Glasses} alt="Decoration" width={50} height={40} />
        <hr className="w-24 border-red-400 border-2" />
      </div>

      {/* Service Cards */}
      <div className="relative z-10 py-8 px-6">
          <div className="mx-12 flex">
            <div className=" gap-12 grid w-auto lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {Banquet.map((card) => (
              <Card key={card.id} img={card.src} alt={card.alt} title={card.title} desc={card.desc}/>
            ))}
            </div>
            </div>
            </div>
    </div>
  );
};

export default OurServices;
