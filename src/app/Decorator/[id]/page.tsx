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

        <div className='container mx-auto py-6 px-4'>
            <div className='rounded-sm border h-full'>
                <div>
                    <ImageGallery categoryId={Decorator._id} category='decor' />
                </div>
                <div className='relative bottom-10 w-full md:flex grid gap-4'>
                    <div className='mx-4 w-full md:w-2/3 bg-white rounded-sm p-4 shadow-xl border'>
                        <div className='flex justify-between items-center pb-2'>
                            <strong className='font-medium md:text-lg text-base'>{Decorator.name} </strong>
                            <div className='flex gap-x-2 items-center'>
                                <span className='border p-1 rounded-sm bg-green-600 text-white'>{Decorator.rating}</span>
                                <h1 className='text-gray-600'>Rating</h1>
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
