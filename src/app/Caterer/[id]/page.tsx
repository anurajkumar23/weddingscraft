import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, PhoneCall } from 'lucide-react';
import ImageGallery from '@/components/Gallery/ImageGallery';
import DecoratorBooking from '@/components/booking';
import QuickInfo from '@/components/QuickInfo';
import getCatererId from '@/utils/caterer/GetCatererId';
import CardPage from '@/components/Caterers/page';
import ReviewRating from '@/components/Review&Rating/Review&Rating';
import GalleryComponent from '@/components/Gallery/GalleryComponent';

interface PackageData {
    veg: Record<string, string[]>;
    nonveg: Record<string, string[]>;
    addon: Record<string, { name: string; price: number }[]>;
    price: number;
}

interface CatererData {
    _id: string;
    name: string;
    description: string;
    rating: number;
    like: any[];
    yearOfEstd: number;
    billboard: string;
    photos: string[];
    basic?: PackageData;
    standard?: PackageData;
    deluxe?: PackageData;
    reviews: any[];
    __v: number;
    gallery: any[];
}

const Page = async ({ params }: { params: { id: string } }) => {
    const caterer: CatererData = await getCatererId(params.id);

    const packageTypes = ['basic', 'standard', 'deluxe'] as const;
    const availablePackages = packageTypes.filter(type => caterer[type]);

    const getPackageLayoutClass = (packageCount: number) => {
        switch (packageCount) {
            case 1:
                return 'md:grid-cols-1 max-w-md mx-auto';
            case 2:
                return 'md:grid-cols-2 max-w-3xl mx-auto';
            default:
                return 'md:grid-cols-2 lg:grid-cols-3';
        }
    };

    return (
        <div className='w-screen py-6 '>
        <div className='rounded-sm border h-full'>
            <div>
                    <ImageGallery categoryId={caterer._id} category='caterer' />
                </div>

                <div className='lg:flex'>
                    <div className='lg:w-2/3 bg-white lg:p-8'>
                        <div className='mb-8 p-4'>
                            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4'>
                                <h1 className='text-2xl sm:text-3xl font-bold mb-2 sm:mb-0'>{caterer.name}</h1>
                                <div className='flex items-center'>
                                    <span className='px-2 py-1 rounded-md bg-green-600 text-white font-semibold text-sm'>{caterer.rating}</span>
                                    <span className='ml-2 text-gray-600 text-sm'>Rating</span>
                                </div>
                            </div>
                            <div className="flex items-center mb-4">
                                <MapPin className='mr-2 flex-shrink-0' />
                                <p className='text-gray-600'>Location information not available</p>
                            </div>
                            <div className='mb-4'>
                                <h2 className='font-semibold mb-2'>Details:</h2>
                                <p className='text-gray-600'>{caterer.description}</p>
                            </div>
                            <Button className='mb-6 gap-x-2 bg-green-600 hover:bg-green-700 text-white' size="lg">
                                <PhoneCall className='w-4 h-4' />
                                Contact Us
                            </Button>
                            <div className="mb-8">
                                <QuickInfo data={caterer} />
                            </div>
                        </div>

                        <div className={`grid p-4 md:p-0 gap-6 ${getPackageLayoutClass(availablePackages.length)}`}>
                            {availablePackages.map((packageType) => {
                                const packageData = caterer[packageType];
                                if (packageData) {
                                    return (
                                        <CardPage
                                            key={packageType}
                                            name={packageType}
                                            veg={packageData.veg}
                                            nonveg={packageData.nonveg}
                                            addon={packageData.addon}
                                            price={packageData.price}
                                        />
                                    );
                                }
                                return null;
                            })}
                        </div>

                        <div id="Photos">
                            <GalleryComponent initialData={caterer.gallery} categoryId={caterer._id} category='caterer' />
                        </div>

                        <div className="mt-12">
                            <h2 className="text-2xl font-bold mb-6">Reviews</h2>
                            <ReviewRating initialData={caterer} category="Caterer"/>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/3 bg-gray-100 p-6 lg:p-8">
                        <div className="sticky top-6">
                            <DecoratorBooking />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;