'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react';

interface ImageGalleryProps {
    images: string[];
    category: string;
}


const ImageGallery: React.FC<ImageGalleryProps> = ({ images, category }) => {
    const [mainImage, setMainImage] = useState(0) // Main image state for slider
    const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)
    const [sliderActive, setSliderActive] = useState(false) // Track if slider has been clicked

    const openFullscreen = (image: string) => {
        setFullscreenImage(image)
    }

    const closeFullscreen = () => {
        setFullscreenImage(null)
    }

    const nextImage = () => {
        setMainImage((prev) => (prev + 1) % images.length)
        setSliderActive(true) // Set slider as active when clicking next
    }

    const prevImage = () => {
        setMainImage((prev) => (prev - 1 + images.length) % images.length)
        setSliderActive(true) // Set slider as active when clicking previous
    }

    const renderImages = () => {
        switch (images?.length) {
            case 1:
                return (
                    <div className='container mx-auto px-4'>
                        <div className="w-full relative h-[400px]" onClick={() => openFullscreen(images[0])}>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_Backend_Url_Image}images/${category}/media/${images[0]}`}
                                //   src={images[0]}
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
                        {images?.map((image, index) => (
                            <div key={index} className="relative" onClick={() => openFullscreen(image)}>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_Backend_Url_Image}images/${category}/media/${image}`}
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
                        <div className="relative" onClick={() => openFullscreen(images[0])}>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_Backend_Url_Image}images/${category}/media/${images[0]}`}
                                // src={images[0]}
                                alt="Main image"
                                layout="fill"
                                objectFit="cover"
                                loading="lazy"
                                className="rounded-lg cursor-pointer"
                                unoptimized
                            />
                        </div>
                        <div className="grid grid-rows-2 gap-2">
                            {images?.slice(1).map((image, index) => (
                                <div key={index} className="relative" onClick={() => openFullscreen(image)}>
                                    <Image
                                       src={`${process.env.NEXT_PUBLIC_Backend_Url_Image}images/${category}/media/${image}`}
                                        // src={image}
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
                        <div className="relative col-span-1" onClick={() => openFullscreen(images?.[0])}>
                            <Image
                               src={`${process.env.NEXT_PUBLIC_Backend_Url_Image}images/${category}/media/${images?.[0]}`}
                                // src={images[0]}
                                alt="Main image"
                                layout="fill"
                                objectFit="cover"
                                loading="lazy"
                                className="rounded-lg cursor-pointer"
                                unoptimized
                            />
                        </div>
                        <div className="grid  grid-rows-2 gap-2 ">
                            <div className="relative col-span-1" onClick={() => openFullscreen(images?.[1])}>
                                <Image
                                   src={`${process.env.NEXT_PUBLIC_Backend_Url_Image}images/${category}/media/${images?.[1]}`}
                                    alt="Image 2"
                                    layout="fill"
                                    objectFit="cover"
                                    loading="lazy"
                                    className="rounded-lg cursor-pointer"
                                    unoptimized
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {images?.slice(2, 4).map((image, index) => (
                                    <div key={index} className="relative" onClick={() => openFullscreen(image)}>
                                        <Image
                                           src={`${process.env.NEXT_PUBLIC_Backend_Url_Image}images/${category}/media/${image}`}
                                            // src={image}
                                            alt={`Image ${index + 2}`}
                                            layout="fill"
                                            objectFit="cover"
                                            loading="lazy"
                                            className="rounded-lg cursor-pointer"
                                            unoptimized
                                        />
                                        {index === 1 && images?.length > 4 && (
                                            <div className="cursor-pointer absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                                                <span className="text-white font-bold">
                                                    +{images?.length - 3} more
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
                       src={`${process.env.NEXT_PUBLIC_Backend_Url_Image}images/${category}/media/${images[mainImage]}`}
                        // src={images[mainImage]}
                        alt={`Main image ${mainImage + 1}`}
                        layout="fill"
                        objectFit="cover"
                        loading="lazy"
                        className="rounded-lg cursor-pointer"
                        onClick={() => openFullscreen(images[mainImage])}
                        unoptimized
                    />
                    {images?.length > 1 && (
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
                    {images?.length > 1 && (
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
                        src={`${process.env.NEXT_PUBLIC_Backend_Url_Image}images/${category}/media/${fullscreenImage}`}
                            // src={fullscreenImage}
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
                                const currentIndex = images.indexOf(fullscreenImage);
                                const prevIndex = (currentIndex - 1 + images.length) % images.length;
                                setFullscreenImage(images[prevIndex]);
                            }}
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-60 p-2 rounded-full"
                            onClick={() => {
                                const currentIndex = images.indexOf(fullscreenImage);
                                const nextIndex = (currentIndex + 1) % images.length;
                                setFullscreenImage(images[nextIndex]);
                            }}
                        >
                            <ChevronRight size={24} />
                        </button>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {images.map((image, index) => (
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
