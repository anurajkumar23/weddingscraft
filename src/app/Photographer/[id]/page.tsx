import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, MapPinned, PhoneCall } from 'lucide-react';
import getDecoratorId from '@/utils/decorator/GetDecoratorid';
import ImageGallery from '@/components/Gallery/ImageGallery';
import Link from 'next/link';
// import QuickInfo from './QuickInfo';
import DecoratorBooking from '../../../components/booking';
import getPhotographerId from '@/utils/Photographer/GetPhotographerId';
import QuickInfo from '@/components/QuickInfo';




const Page = async ({ params }: { params: { id: string } }) => {
    const Photographer = await getPhotographerId(params.id);

    return (

        <div className='container mx-auto py-6 px-4'>
            <div className='rounded-sm border h-full'>
                <div>
                    <ImageGallery images={Photographer.photos} category='photographer' />
                </div>
                <div className='relative bottom-10 w-full md:flex grid gap-4'>
                    <div className='mx-4 w-full md:w-2/3 bg-white rounded-sm p-4 shadow-xl border'>
                        <div className='flex justify-between items-center pb-2'>
                            <strong className='font-medium md:text-lg text-base'>{Photographer.name} </strong>
                            <div className='flex gap-x-2 items-center'>
                                <span className='border p-1 rounded-sm bg-green-600 text-white'>{Photographer.rating}</span>
                                <h1 className='text-gray-600'>Rating</h1>
                            </div>
                        </div>
                        <div className="flex items-center mb-2">
                            <MapPin className='mr-2' />

                            {Photographer.location ? (
                                <>
                                    <p>{Photographer.location.city},</p>
                                    <p>{Photographer.location.area},</p>
                                    <p>{Photographer.location.pincode}</p>
                                </>
                            ) : (
                                <p>No location information available</p>
                            )}
                            <Link href={`${Photographer.locationUrl}`}>
                                <div className='border text-red-600 border-red-500 hover:bg-red-600 hover:text-white ml-4 p-1 rounded-sm font-sans cursor-pointer'>
                                    <span className='flex gap-x-2'>View on Map <MapPinned /></span>
                                </div>
                            </Link>
                        </div>
                        <div className='flex space-x-2'>
                            <h1>
                                Details:
                            </h1>
                            <p className='text-gray-500'>{Photographer.description}</p>
                        </div>
                        <Button className='mr-2 mb-2 mt-2 gap-x-2 bg-green-600 hover:bg-green-700 hover:text-white text-white text-base' variant="outline">
                            <PhoneCall />
                            Contact Us
                        </Button>
                        <div className="space-y-6 py-6">
                            <QuickInfo data={Photographer} />
                        </div>

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