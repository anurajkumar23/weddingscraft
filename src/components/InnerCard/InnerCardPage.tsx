'use client'

import React from "react"
import InnerPage from "./page"

export interface FavoriteItem {
  _id: string
  name: string
  rating: number
  description?: string
  location: {
    city: string
    pincode: string
    area: string
  }
  locationUrl?: {
    coordinates: number[]
    url: string
  }
  price: number | number[]
  capacity?: number
  services?: string[]
  gallery: {
    name: string
    photos: string[]
    _id: string
  }[]
  [key: string]: any
}

export interface InnerCardProps {
  data: FavoriteItem[]
  link: string
  category: string
}

const InnerCardPage: React.FC<InnerCardProps> = ({ data, link, category }) => {
  return (
    <div className="pt-10 w-full">
      <div>
        {data.map((item) => (
          <div key={item._id}>
            <InnerPage
              id={item._id}
              name={item.name}
              rating={item.rating}
              description={item.description || ""}
              location={item.location}
              locationUrl={item.locationUrl}
              category={category}
              link={link}
              images={item.gallery.flatMap(folder => folder.photos)}
              price={Array.isArray(item.price) ? item.price[0] : item.price}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default InnerCardPage