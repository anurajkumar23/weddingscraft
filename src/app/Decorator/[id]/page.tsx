import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, MapPinned, PhoneCall } from 'lucide-react';
import getDecoratorId from '@/utils/decorator/GetDecoratorId';
import ImageGallery from '@/components/Gallery/ImageGallery';
import Link from 'next/link';
import QuickInfo from '../../../components/QuickInfo';
import DecoratorBooking from '../../../components/booking';
import GalleryComponent from '@/components/Gallery/GalleryComponent';
import ReviewRating from '@/components/Review&Rating/Review&Rating';




const Page = async ({ params }: { params: { id: string } }) => {
    const Decorator = await getDecoratorId(params.id);
    return (

        <div className='w-screen py-6 '>
            <div className='rounded-sm border h-full'>
                <div>
                    <ImageGallery categoryId={Decorator._id} category='decor' />
                </div>
                <div className='relative bottom-10  md:flex gap-4'>
                    <div className=' md:w-2/3 bg-white rounded-sm p-4 shadow-xl border'>
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4'>
                                <h1 className='text-2xl sm:text-3xl font-bold mb-2 sm:mb-0'>{Decorator.name}</h1>
                                <div className='flex items-center'>
                                    <span className='px-2 py-1 rounded-md bg-green-600 text-white font-semibold text-sm'>{Decorator.rating}</span>
                                    <span className='ml-2 text-gray-600 text-sm'>Rating</span>
                                </div>
                            </div>
                        <div className="flex items-center mb-2">
                            <MapPin className='mr-2' />

                            {Decorator.location ? (
                                <>
                                    <p>{Decorator.location.city},</p>
                                    <p>{Decorator.location.area},</p>
                                    <p>{Decorator.location.pincode}</p>
                                </>
                            ) : (
                                <p>No location information available</p>
                            )}
                        </div>
                        <h1>Details:</h1>
                        <Button className='mr-2 mb-2 mt-2 gap-x-2 bg-green-600 hover:bg-green-700 hover:text-white text-white text-base' variant="outline">
                            <PhoneCall />
                            Contact Us
                        </Button>
                        <div className="space-y-6 py-6">
                            <QuickInfo data={Decorator} />
                        </div>
                        <div id="Photos">
                            <GalleryComponent initialData={Decorator.gallery} categoryId={Decorator._id} category='decor' />
                        </div>

                        <ReviewRating initialData={Decorator} category="Decorator"/>
                    </div>
                    <div className=" md:w-1/3 bg-muted p-6">
                        <div className="sticky top-6">
                           <DecoratorBooking/>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Page;
