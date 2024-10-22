import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import Card from '@/components/Card'
import banquetBg from '../../../../public/Design_elements/Frame 5052.png'

interface Location {
  city: string
  area: string
  pincode: string
}

interface BanquetData {
  _id: string
  name: string
  gallery: { photos: string[] }[]
  alt: string
  rating: number
  location: Location
}

interface BanquetPageProps {
  data: BanquetData[]
  link: string
}

const BanquetPage: React.FC<BanquetPageProps> = ({ data, link }) => {
  const limitedData = data.slice(0, 8)

  return (
    <div className="pt-10">
      <div className="relative w-full min-h-screen">
        <div className="absolute inset-0 z-0">
          <Image
            src={banquetBg}
            alt="Banquet Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            placeholder="blur"
          />
        </div>
        <div className="relative z-10 py-16 px-6">
          <h1 className="font-semibold text-3xl text-center mb-10">Banquet Halls</h1>
          <div className="container mx-auto">
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {limitedData.map((card) => (
                <Card
                  key={card._id}
                  _id={card._id}
                  img={card.gallery.flatMap(folder => folder.photos)}
                  alt={card.alt}
                  title={card.name}
                  link={link}
                  rating={card.rating}
                  location={card.location}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-12">
            <Link 
              href="/Banquet" 
              className="flex items-center gap-2 text-lg font-semibold text-red-600 hover:text-red-700 transition-all"
            >
              View All
              <ChevronDown className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BanquetPage