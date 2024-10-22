import { MapPin, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Location {
  city: string
  area: string
  pincode: string
}

interface CardProps {
  _id: string
  img: string[]
  alt: string
  title: string
  link: string
  rating: number
  location: Location
}

const Card: React.FC<CardProps> = ({ _id, img, alt, title, link, rating, location }) => {
  return (
    <Link href={`${link}/${_id}`} className="block w-full group">
      <div className="relative w-full aspect-square overflow-hidden rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 group-hover:shadow-md">
        <Image
          src={img[0] || '/placeholder.svg'}
          alt={alt}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="mt-3 space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-base sm:text-lg line-clamp-2 flex-grow pr-2">{title}</h3>
          <div className="flex items-center space-x-1 flex-shrink-0">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
          </div>
        </div>
        {location && (
          <div className="flex items-start space-x-1 text-sm text-gray-500">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p className="line-clamp-2">
              {location.area}, {location.city} {location.pincode}
            </p>
          </div>
        )}
      </div>
    </Link>
  )
}

export default Card