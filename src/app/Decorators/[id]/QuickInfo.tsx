import React from 'react'

const QuickInfo = ({DecoratorData} : any) => {
  return (
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
  )
}

export default QuickInfo
