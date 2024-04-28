import Image from 'next/image'
import React from 'react'
import bgImage from "../../../../public/2nd backgroun image Prototype_20240426_220425_0000.png"
import InnerCard from '@/components/photographers/InnerCard'

const page = () => {

  const data = [
    { id: "1", title: "Elite", description: "Full coverage of preceremony, Ceremony, and Reception Exclusive High-end retouching and enhancement Custom-designed photo album with exquisite photos", Price: 3000 },
    { id: "2", title: "Elite", description: "Full coverage of preceremony, Ceremony, and Reception Exclusive High-end retouching and enhancement Custom-designed photo album with exquisite photos", Price: 3000 },
    { id: "3", title: "Elite", description: "Full coverage of preceremony, Ceremony, and Reception Exclusive High-end retouching and enhancement Custom-designed photo album with exquisite photos", Price: 3000 },
  ]



  return (
    <div className='w-full bg-gradient-to-r from-violet-200 to-pink-50'>
      <Image
        src={bgImage}
        alt='background image'
        className='absolute -z-1 object-cover md:h-full h-full w-full'
      />
      <div className='z-10 relative py-36 w-full grid md:grid-cols-3 gap-4 md:px-80 overflow-hidden'>
        {data.map((items) => (
          <InnerCard
            key={items.id}
            id={items.id}
            title={items.title}
            description={items.description}
            Price={items.Price}
          />
        ))}
      </div>
    </div>
  )
}

export default page
