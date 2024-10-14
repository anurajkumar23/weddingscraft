'use client'

import React, { useState, useEffect } from "react"
import axios from "axios"
import InnerPage from "./page"


export interface CardComponent {
  galleryImages: never[]
  _id: string
  alt: string
  name: string
  rating: number
  description: string
  location: {
    city: string
    pincode: string
    area: string
  }
  locationUrl?: {
    coordinates: number[]
    url: string
  }
  link: string
  billboard: string
  like: { userId: string; likedAt: Date }[]
  img: string[]
  imgLink: string
  category: string
  price: number
  capacity: number
  specialFeature: string[]
  yearOfEstd: number
  services: string[]
  type: string
  availability: string[]
  openHours: string
  operatingDays: string
  reviews: any[]
  gallery: { photos: string[] }[]
}

export interface InnerCardProps {
  data: CardComponent[]
  link: string
  category: string
}

const InnerCardPage: React.FC<InnerCardProps> = ({ data, link, category }) => {
  const [cardsWithImages, setCardsWithImages] = useState<CardComponent[]>([])

  useEffect(() => {
    const fetchGalleryImages = async () => {
      const token = localStorage.getItem("jwt_token")
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }

      const updatedCards = await Promise.all(
        data.map(async (card) => {
          try {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/${category}/${card._id}`,
              config
            )
            const galleryData = response.data.data.gallery
            const images = galleryData.flatMap((folder: { photos: string[] }) => folder.photos)
            return { ...card, galleryImages: images }
          } catch (err) {
            console.error(`Failed to fetch images for card ${card._id}:`, err)
            return { ...card, galleryImages: [] }
          }
        })
      )

      setCardsWithImages(updatedCards)
    }

    fetchGalleryImages()
  }, [data, category])

  return (
    <div className="pt-10 w-full">
      <div>
        {cardsWithImages.map((card) => (
          <div key={card._id}>
            <InnerPage
              id={card._id}
              name={card.name}
              rating={card.rating}
              description={card.description}
              location={card.location}
              locationUrl={card.locationUrl}
              category={category}
              link={link}
              images={card.galleryImages || []}
              price={card.price}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default InnerCardPage