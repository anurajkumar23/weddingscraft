"use client"
import React, { useState } from 'react';
import { GoCheckCircleFill } from 'react-icons/go';
import { Button } from '../ui/button';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import ImageContainer from './ImageContainer';
import Banquet1 from "../../../public/Banquet-1.jpg";
import UserReview from './UserReview';
import { Rate } from "antd";

const QuickInfo: React.FC = () => {


  const userReviews = [ 
    {
      id:"1", name:"Anuraj kumar", date:"27 july 2024", heading:"Nice", ratings:4.5, description:"Average Hall with more ambiance and less quality food. The hall is completely well decorated but related to food the quality is too average and up to mark as per expected. Visited there for friends functions. I liked all the surroundings and atmosphere but food taste upsets me more."
    },
    {
      id:"2", name:"Gunjan kumar", date:"27 july 2024", heading:"Amazing Experience", ratings:3, description:"One the best hotels in Thane location where you can find good quality of food with good view of Thane They have huge capicity of banquet also where they give good rates to clients they also have live music in every evening where one can enjoy their dinner with family i strongly recommend to this hotel"
    }
  ];
  
  const Banquet = [
    { id: "1", src: Banquet1, alt: "Banquet", title: "Photos", links:"BanquetHall",numbers:"45"},
    { id: "2", src: Banquet1, alt: "Banquet", title: "Videos", links:"BanquetHall",numbers:"4"},
    // { id: "2", src: Banquet2, alt: "Banquet", title: "Decorators" },
    // { id: "3", src: Catering, alt: "Catering", title: "Caterers" },
    // { id: "4", src: Photographer, alt: "Photographer", title: "Photographers" }
];
  const servicesData = [
    'Lock on bedroom door',
    'Free Wifi',
    'Room service',
    'Swimming pool',
    'Gym',
    'Spa',
    'Restaurant',
    'Parking',
    'Airport shuttle',
    'Lock on bedroom door',
    'Free Wifi',
    'Room service',
    'Swimming pool',
    'Gym',
    'Spa',

  ];

  const [showAllServices, setShowAllServices] = useState(false);

  const toggleShowAllServices = () => {
    setShowAllServices(!showAllServices);
  };

  return (
    <div>
      <div className='container border w-full h-full rounded-sm bg-white py-6'>
        <div className='grid grid-cols-2'>
          <h1 className='text-2xl font-medium mb-6'>Quick Information</h1>
          <h1 className='text-2xl font-medium mr-6 mb-6'>Timings</h1>
          <div>
            <h1 className='text-lg text-gray-600 '>Year of Establishment</h1>
            <h1 className='text-lg font-semibold'>2018</h1>
          </div>
          <div className='flex space-x-4'>
            <h1 className='font-medium text-lg'>Mon - Sun</h1>
            <h1 className='text-gray-700'>Open 24 Hrs</h1>
          </div>
        </div>
      </div>
      <div className='container border rounded-sm w-full h-full'>
        <div className='grid grid-cols-3 py-6'>
          <div>
            <h1 className='text-2xl font-medium mb-6'>Type</h1>
            <div className='flex space-x-2'>
              <GoCheckCircleFill size={25} className='text-green-600' />
              <h1 className='font-semibold'>AC</h1>
            </div>
          </div>
          <div>
            <h1 className='text-2xl font-medium mb-6'>Seating Capacity</h1>
            <div className='flex space-x-2'>
              <GoCheckCircleFill size={25} className='text-green-600' />
              <h1 className='font-semibold'>Upto 100 Persons</h1>
            </div>
          </div>
          <div>
            <h1 className='text-2xl font-medium mb-6'>Availability</h1>
            <div className='flex space-x-2'>
              <GoCheckCircleFill size={25} className='text-green-600' />
              <h1 className='font-semibold'>Haldi Function</h1>
            </div>
          </div>
        </div>
      </div>
      <div className='container border w-full h-full rounded-sm bg-white py-6'>
        <h1 className='text-2xl font-medium mb-6'>Services</h1>
        <div className='grid grid-cols-2'>
          {servicesData.slice(0, 5).map((service, index) => (
            <div key={index} className='flex space-x-2 pb-3'>
              <GoCheckCircleFill size={25} className='text-green-600' />
              <h1 className='font-semibold'>{service}</h1>
            </div>
          ))}
        </div>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant='outline' onClick={toggleShowAllServices} className='text-blue-500 mt-4 border-blue-500'>
              View All
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Services</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              <div className='grid grid-cols-2 mt-4'>
                {servicesData.map((service, index) => (
                  <div key={index} className='flex space-x-2 pb-3'>
                    <GoCheckCircleFill size={25} className='text-green-600' />
                    <h1 className='font-semibold'>{service}</h1>
                  </div>
                ))}
              </div>
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className='container border w-full h-full rounded-sm bg-white py-6'>
        <div>
          <h1 className='text-2xl font-medium mb-6'>Photos</h1>
          <div className='flex gap-x-6'>
          {Banquet.map((card) =>(
          <ImageContainer
           key={card.id}
           img={card.src} // Change here
           alt={card.alt}
           title={card.title}
           number={card.numbers}
          //  id={card.id}
          //  link={card.links}
          />
           ))}
           </div>
        </div>
      </div>
      <div className='container border w-full h-full rounded-sm bg-white py-6'>
        <div >
          <h1 className='text-2xl font-medium mb-6'>Reviews & Ratings</h1>
          <div className='flex gap-x-4'>
          <span className='border p-4 rounded-xl bg-green-600 text-white text-xl'>4.5</span>
          <h1 className='text-2xl font-semibold items-center flex'>2,705 Rating</h1>
          </div>

          <div className='py-8'>
          <h1 className='text-2xl font-medium'>Post your Review</h1>
          <Rate className='py-4 text-4xl'/>
          </div>
          <h1 className='text-2xl font-medium py-4 '>Users Review</h1>
          {/* <hr/> */}
          {userReviews.map((user)=>(
          <UserReview
          key={user.id}
          user={user.name}
          ratings= {user.ratings}
          post={user.date}
          heading={user.heading}
          description={user.description}
          />
        ))}
        </div>
      </div>
      
    </div>
  );
};

export default QuickInfo;
