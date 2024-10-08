'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import axios from 'axios'

interface ImageGalleryProps {
  categoryId: string;
  category: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ categoryId, category }) => {
  const [allImages, setAllImages] = useState<string[]>([])
  const [mainImage, setMainImage] = useState(0)
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)
  const [sliderActive, setSliderActive] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getConfig = useCallback(() => {
    const token = localStorage.getItem("jwt_token")
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  }, [])

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${category}/${categoryId}`, getConfig())
        const galleryData = response.data.data.gallery
        const images = galleryData.flatMap((folder: { photos: string[] }) => folder.photos)
        setAllImages(images)
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch images:', err)
        setError('Failed to load images. Please try again later.')
        setLoading(false)
      }
    }

    fetchImages()
  }, [categoryId, category, getConfig])

  const openFullscreen = (image: string) => {
    setFullscreenImage(image)
  }

  const closeFullscreen = () => {
    setFullscreenImage(null)
  }

  const nextImage = () => {
    setMainImage((prev) => (prev + 1) % allImages.length)
    setSliderActive(true)
  }

  const prevImage = () => {
    setMainImage((prev) => (prev - 1 + allImages.length) % allImages.length)
    setSliderActive(true)
  }

  const renderImages = () => {
    if (loading) {
      return <div className="w-full h-[400px] flex items-center justify-center">Loading...</div>
    }

    if (error) {
      return <div className="w-full h-[400px] flex items-center justify-center text-red-500">{error}</div>
    }

    switch (allImages.length) {
      case 0:
        return (
          <div className="w-full relative h-[400px] bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">No images available</p>
          </div>
        )
      case 1:
        return (
          <div className='container mx-auto px-4'>
            <div className="w-full relative h-[400px]" onClick={() => openFullscreen(allImages[0])}>
              <Image
                src={allImages[0]}
                alt="Single image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg cursor-pointer"
                unoptimized
              />
            </div>
          </div>
        )
      case 2:
        return (
          <div className="grid grid-cols-2 gap-2 h-[400px]">
            {allImages.map((image, index) => (
              <div key={index} className="relative" onClick={() => openFullscreen(image)}>
                <Image
                  src={image}
                  alt={`Image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  loading="lazy"
                  className="rounded-lg cursor-pointer"
                  unoptimized
                />
              </div>
            ))}
          </div>
        )
      case 3:
        return (
          <div className="grid grid-cols-2 gap-2 h-[400px]">
            <div className="relative" onClick={() => openFullscreen(allImages[0])}>
              <Image
                src={allImages[0]}
                alt="Main image"
                layout="fill"
                objectFit="cover"
                loading="lazy"
                className="rounded-lg cursor-pointer"
                unoptimized
              />
            </div>
            <div className="grid grid-rows-2 gap-2">
              {allImages.slice(1).map((image, index) => (
                <div key={index} className="relative" onClick={() => openFullscreen(image)}>
                  <Image
                    src={image}
                    alt={`Image ${index + 2}`}
                    layout="fill"
                    objectFit="cover"
                    loading="lazy"
                    className="rounded-lg cursor-pointer"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return (
          <div className="grid grid-cols-2 gap-2 h-[400px]">
            <div className="relative col-span-1" onClick={() => openFullscreen(allImages[0])}>
              <Image
                src={allImages[0]}
                alt="Main image"
                layout="fill"
                objectFit="cover"
                loading="lazy"
                className="rounded-lg cursor-pointer"
                unoptimized
              />
            </div>
            <div className="grid grid-rows-2 gap-2">
              <div className="relative col-span-1" onClick={() => openFullscreen(allImages[1])}>
                <Image
                  src={allImages[1]}
                  alt="Image 2"
                  layout="fill"
                  objectFit="cover"
                  loading="lazy"
                  className="rounded-lg cursor-pointer"
                  unoptimized
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {allImages.slice(2, 4).map((image, index) => (
                  <div key={index} className="relative" onClick={() => openFullscreen(image)}>
                    <Image
                      src={image}
                      alt={`Image ${index + 2}`}
                      layout="fill"
                      objectFit="cover"
                      loading="lazy"
                      className="rounded-lg cursor-pointer"
                      unoptimized
                    />
                    {index === 1 && allImages.length > 4 && (
                      <div className="cursor-pointer absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                        <span className="text-white font-bold">
                          +{allImages.length - 3} more
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="container mx-auto px-4">
      {sliderActive && (
        <div className="relative w-full h-[400px]">
          <Image
            src={allImages[mainImage]}
            alt={`Main image ${mainImage + 1}`}
            layout="fill"
            objectFit="cover"
            loading="lazy"
            className="rounded-lg cursor-pointer"
            onClick={() => openFullscreen(allImages[mainImage])}
            unoptimized
          />
          {allImages.length > 1 && (
            <>
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                onClick={prevImage}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                onClick={nextImage}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      )}
      {!sliderActive && (
        <div className="mt-4">
          {renderImages()}
          {allImages.length > 1 && (
            <>
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                onClick={prevImage}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                onClick={nextImage}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      )}

      {fullscreenImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={fullscreenImage}
              alt="Fullscreen image"
              width={1200}
              height={900}
              loading="lazy"
              className="max-w-full max-h-[90vh] object-contain"
              unoptimized
            />
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              onClick={closeFullscreen}
            >
              <X size={24} />
            </button>
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-60 p-2 rounded-full"
              onClick={() => {
                const currentIndex = allImages.indexOf(fullscreenImage);
                const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
                setFullscreenImage(allImages[prevIndex]);
              }}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-60 p-2 rounded-full"
              onClick={() => {
                const currentIndex = allImages.indexOf(fullscreenImage);
                const nextIndex = (currentIndex + 1) % allImages.length;
                setFullscreenImage(allImages[nextIndex]);
              }}
            >
              <ChevronRight size={24} />
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${fullscreenImage === image ? 'bg-white' : 'bg-gray-500'}`}
                  onClick={() => setFullscreenImage(image)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageGallery