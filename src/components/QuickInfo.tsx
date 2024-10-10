import React from 'react'
import { GoCheckCircleFill } from 'react-icons/go'


const data1 = {
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




const QuickInfo = ({ data }: any) => {
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
              <h1 className="text-lg font-semibold">{data.yearOfEstd}</h1>
            </div>
            <div className="flex space-x-4">
              <h1 className="font-medium text-lg">{data.operatingDays}</h1>
              <h1 className="text-gray-700">Open {data.openHours}</h1>
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
          {data?.services?.length ? (
            data.services.map(
              (
                service: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined,
                index: React.Key | null | undefined
              ) => (
                <div key={index} className="flex space-x-2 pb-3">
                  <GoCheckCircleFill size={25} className="text-green-600" />
                  <h1 className="font-semibold">{service}</h1>
                </div>
              )
            )
          ) : data1?.services?.length ? (
            data1.services.map(
              (
                service: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined,
                index: React.Key | null | undefined
              ) => (
                <div key={index} className="flex space-x-2 pb-3">
                  <GoCheckCircleFill size={25} className="text-green-600" />
                  <h1 className="font-semibold">{service}</h1>
                </div>
              )
            )
          ) : (
            <p className="bg-gray-500 p-4 text-white">No location information available</p>
          )}
        </div>
      </div>     
    </div>
  )
}

export default QuickInfo
