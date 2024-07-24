import React from 'react';
import { Button } from '@/components/ui/button';
import { PhoneCall } from 'lucide-react';
import getDecoratorId from '@/utils/decorator/GetDecoratorid';
import GalleryImage from '../../../components/Gallery/Gallary';

// const predefinedDimensions = [
//     { width: 4, height: 3 },
//     { width: 1, height: 1 },
//     { width: 3, height: 4 },
//     { width: 4, height: 3 },
//     { width: 3, height: 4 },
//     { width: 4, height: 3 },
//     { width: 3, height: 4 },
//     { width: 1, height: 1 },
//     { width: 4, height: 3 },
//   ];
  
  // const getRandomDimension = () => {
  //   return predefinedDimensions[Math.floor(Math.random() * predefinedDimensions.length)];
  // };
  
  const Page = async ({ params }: { params: { id: string } }) => {
    const Decorator = await getDecoratorId(params.id);
  
    // Convert photos to the required format for the Gallery component with random dimensions
    // const photos = Decorator.photos.map((photo: string) => {
    //   const dimension = getRandomDimension();
    //   return {
    //     src: `${process.env.NEXT_PUBLIC_Backend_Url_Image}images/decorator/media/${photo}`,
    //     ...dimension,
    //   };
    // });
  return (

<div className='py-6 mx-4'>
<div className=' rounded-sm border'>
    <div className='border rounded-sm m-1 w-full flex overflow-y-scroll h-96 2xl:h-screen'>

        <GalleryImage
            photos={Decorator.photos}
            category='decorator'
        />
        
    </div>
    <div className='w-full h-full m-4 '>
        {Decorator.name}
        <div>
            {Decorator.description}
        </div>
        <div className=' flex gap-x-2 pt-2'>
            <p className='text-green-600'>Starting Price : </p>
            <p > ₹ {Decorator.price[0]}</p>
        </div>
        <Button className='mr-2 mb-2 mt-2 gap-x-2 bg-green-600 hover:bg-green-700 hover:text-white text-white text-base' variant="outline">
            <PhoneCall />
            Contact Us
        </Button>
    </div>

</div>
</div>
)
}

export default Page;
