import React from 'react'
import { GoCheckCircleFill } from 'react-icons/go'
import { Rate } from "antd";
import UserReview from '@/components/MainCard/UserReview';

const DecoratorDatas = {
  services: [
    "Wedding",
    "Corporate Event",
    "Birthday Party",
    "Festival & Seasonal",
    "Floral Designs",
    "Lighting Services",
    "Themed Decor"
  ]
};


const userReviews = [
  {
    id: "1",
    name: "Anuraj kumar",
    date: "27 july 2024",
    heading: "Nice",
    ratings: 4.5,
    description:
      "Average Hall with more ambiance and less quality food. The hall is completely well decorated but related to food the quality is too average and up to mark as per expected. Visited there for friends functions. I liked all the surroundings and atmosphere but food taste upsets me more.",
  },
  {
    id: "2",
    name: "Gunjan kumar",
    date: "27 july 2024",
    heading: "Amazing Experience",
    ratings: 3,
    description:
      "One the best hotels in Thane location where you can find good quality of food with good view of Thane They have huge capicity of banquet also where they give good rates to clients they also have live music in every evening where one can enjoy their dinner with family i strongly recommend to this hotel",
  },
];

const QuickInfo = ({DecoratorData} : any) => {
  return (
    <div>
    <div>
           <div
        id="Services"
        className="container border w-full h-full rounded-sm bg-white py-6"
      >
        <div className="grid grid-cols-2">
          <h1 className="text-2xl font-medium mb-6">Quick Information</h1>
          <h1 className="text-2xl font-medium mr-6 mb-6">Timings</h1>
          <div>
            <h1 className="text-lg text-gray-600 ">Year of Establishment</h1>
            <h1 className="text-lg font-semibold">{DecoratorData.yearOfEstd}</h1>
          </div>
          <div className="flex space-x-4">
            <h1 className="font-medium text-lg">{DecoratorData.operatingDays}</h1>
            <h1 className="text-gray-700">Open {DecoratorData.openHours}</h1>
          </div>
        </div>
      </div>
    </div>
    <div
        id="Services"
        className="container border w-full h-full rounded-sm bg-white py-6"
      >
        <h1 className="text-2xl font-medium mb-6">Services</h1>
        <div className="grid grid-cols-2">
          {DecoratorDatas.services.map((service, index) => (
            <div key={index} className="flex space-x-2 pb-3">
              <GoCheckCircleFill size={25} className="text-green-600" />
              <h1 className="font-semibold">{service}</h1>
            </div>
          ))}
        </div>
      </div>
      <div
        id="Reviews"
        className="container border w-full h-full rounded-sm bg-white py-6"
      >
        <div>
          <h1 className="text-2xl font-medium mb-6">Reviews & Ratings</h1>
          <div className="flex gap-x-4">
            <span className="border p-4 rounded-xl bg-green-600 text-white text-xl">
              {DecoratorData.rating}
            </span>
            <h1 className="text-2xl font-semibold items-center flex">
              {DecoratorData.reviews.length} Reviews
            </h1>
          </div>

          <div className="py-8">
            <h1 className="text-2xl font-medium">Post your Review</h1>
            <Rate className="py-4 text-4xl" />
          </div>
          <h1 className="text-2xl font-medium py-4 ">Users Review</h1>
          {/* <hr/> */}
          {userReviews.map((user) => (
            <UserReview
              key={user.id}
              user={user.name}
              ratings={user.ratings}
              post={user.date}
              heading={user.heading}
              description={user.description}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuickInfo
