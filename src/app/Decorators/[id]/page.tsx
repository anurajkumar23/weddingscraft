import React from 'react';
import { Button } from '@/components/ui/button';
import { PhoneCall } from 'lucide-react';
import getDecoratorId from '@/utils/decorator/GetDecoratorid';
import GalleryImage from '../../../components/Gallery/Gallary';
import ImageGallery from '@/components/Gallery/ImageGallery';

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

  const images = [
    'https://images.unsplash.com/photo-1682687220063-4742bd7fd538',
    // 'https://images.unsplash.com/photo-1682687220199-d0124f48f95b',
    // 'https://images.unsplash.com/photo-1682687220067-dced9a881b56',
    // 'https://plus.unsplash.com/premium_photo-1683910767532-3a25b821f7ae?q=80&w=2008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    // 'https://images.unsplash.com/photo-1682687220015-186f63b8850a',
    // 'https://images.unsplash.com/photo-1682687220923-c58b9a4592ae',
  ]
  
  const Page = async ({ params }: { params: { id: string } }) => {
    const Decorator = await getDecoratorId(params.id);
  return (

<div className='py-6 mx-4'>
<div className=' rounded-sm border'>
    <div>

        {/* <GalleryImage
            photos={Decorator.photos}
            category='decorator'
        /> */}

        <ImageGallery  images={Decorator.photos}  category='decorator'/>
        
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
