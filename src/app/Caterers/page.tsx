import CardPage from '@/components/Caterers/page'
import React from 'react'
import ChefImage from "../../../public/Confident-smiling-female-chef-holding-two-plates-cooked-food-in-kitchen.jpeg"
import Image from 'next/image';
import getCaterer from '@/utils/caterer/GetCaterer';



export const metadata = {
  title: "Wedding Caterers",
  description:
    "Delight your guests with exquisite cuisine from the best wedding caterers. At Dream Wedding, find top-rated caterers who offer a variety of menus to suit your taste and budget. Whether you prefer traditional dishes or gourmet specialties, ensure your wedding is a culinary success with exceptional catering services.",
  alternates: {
    canonical: `/Caterers`
  },
};


const page = async() => {

  const Caterer = await getCaterer()

  console.log(Caterer, "🐷🐷🐷🐷🐷🥳🎉")

  const cards = [
    { color: 'bg-gradient-to-l from-indigo-400 to-purple-700', name: 'Starter' },
    { color: 'bg-gradient-to-r from-amber-500 to-pink-500', name: 'Basic' },
    { color: 'bg-gradient-to-r from-emerald-400 to-cyan-400', name: 'Deluxe' }
  ];

  return (
    <div className=''>
 <div className="border rounded-md overflow-hidden relative w-full h-60">
      <div className='w-full lg:w-3/4 absolute h-60 z-20 bg-gradient-to-r from-pink-400 to-red-400 rounded-r-full flex flex-col justify-center'>
        <h1 className="lg:p-5 p-2 font-bold lg:text-2xl text-base text-white">Customize your food According to your Venue</h1>
        <div className='lg:justify-end lg:mr-10 flex justify-center '>
          <div className="bg-white p-4 rounded-lg w-1/2 text-center">
            <h2 className="lg:text-xl text-base font-bold">Book your personal halwai</h2>
            <p className="text-sm">Let our expert chefs take care of your event with delicious food.</p>
            <button className="bg-indigo-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-indigo-600 transition duration-300">Book Now</button>
          </div>
        </div>
      </div>

      <div className='hidden lg:block w-2/6 lg:h-full absolute top-0 right-0 h-full'>
        <Image
          src={ChefImage}
          alt="Chef"
          className="object-cover h-full"
          layout="responsive"
          width={500}
          height={500}
        />
      </div>

      <div className="absolute hidden lg:block lg:bottom-14  -left-10 z-30 mx-10 w-80 p-5">
        <p className="text-white text-sm font-semibold">*Enjoy personalized catering services for your special event</p>
      </div>
    </div>
      <div className='mx-8 md:grid grid-cols-3 gap-4 py-4'>
        {cards.map((card, index) => (
          <CardPage key={index} color={card.color} name={card.name} Caterer={Caterer} />
        ))}
      </div>
    </div>
  )
}

export default page
