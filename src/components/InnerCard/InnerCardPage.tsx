import React from "react";

import InnerPage from "./page";



export interface CardComponent {
  _id: string;
  alt: string;
  name: string;
  rating: number;
  description: string;
  location: {
    city: string;
    pincode: string;
    area: string;
  };
  locationUrl: string;
  link: string;
  billboard: string;
  like: [];
  img: string[];
  imgLink:string;
  category:string;
}

export interface InnerCardProps {
  data: CardComponent[];
  link:string;
  imgLink:string;
  category:string;
}

const InnerCardPage: React.FC<InnerCardProps> = ({ data, link, imgLink, category }) => {


  return (
    <div className="pt-10 w-full">
      <div>
        {data?.map((card: any) => (
          <div key={card._id}>
            <InnerPage
              billboard={card.billboard}
              alt={card.alt}
              like={card.like}
              name={card.name}
              _id={card._id}
              rating={card.rating}
              description={card.description}
              location={card.location}
              locationUrl={card.locationUrl}
              link={link}
              img={card.photos}
              imgLink={imgLink}
              category={category}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InnerCardPage;