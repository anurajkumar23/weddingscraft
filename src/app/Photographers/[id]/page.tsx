import Image from 'next/image'
import React from 'react'
import bgImage from "../../../../public/2nd backgroun image Prototype_20240426_220425_0000.png"
import InnerCard from '@/components/photographers/InnerCard'
import element3 from "../../../../public/elements/11_20240427_221554_0004.png";
import getPhotographerId from '@/utils/Photographer/GetPhotographerId';


const page = async ({ params }: { params: { id: string } }) => {

  const photographer = await getPhotographerId(params.id)

  // console.log(photographer,"😀😀😀😀🎆🎆🎉🐷🎇")

  const data = [
    { id: "1", title: "Standard", description1: "Capture Cherished Moments",description2:"Coverage of the ceremony and reception Digital photo album with basic editing", Price: 3000 },
    { id: "1", title: "Elite", description1: "Capture Cherished Moments",description2:"Coverage of the ceremony and reception Digital photo album with basic editing", Price: 3000 },
    { id: "1", title: "Premium", description1: "Capture Cherished Moments",description2:"Coverage of the ceremony and reception Digital photo album with basic editing", Price: 3000 },
  ]



  return (
    <div className='w-full h-auto bg-gradient-to-r from-violet-200 to-pink-50  '>
      <Image
        src={bgImage}
        alt='background image'
        className='absolute -z-1 object-cover md:h-full h-full w-full '
      />
      <div className='w-full bg-red z-10 h-24 relative flex justify-center items-center overflow-hidden'>
        <Image
          src={element3}
          alt="background image"
          // layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="absolute max-w-[900px] -z-1  overflow-hidden "
        />
        <h1 className='font-mono text-4xl text-white z-20'>{data[0].title}</h1>
      </div>


      <div className='z-10 relative py-6 w-full grid md:grid-cols-3 sm:grid-cols-2 lg:px-44 gap-4 overflow-hidden'>
        {data.map((items) => (
          <InnerCard
            key={items.id}
            id={items.id}
            title={items.title}
            description1={items.description1}
            description2={items.description2}
            Price={items.Price}
          />
        ))}
      </div>
    </div>
  )
}

export default page
