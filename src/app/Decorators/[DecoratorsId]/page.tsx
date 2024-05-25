import Image from 'next/image'
import React from 'react'
import photo1 from "../../../../public/Banquet-1.jpg"
import photo2 from "../../../../public/Banquet-2.jpg"
import photo3 from "../../../../public/image-1.avif"

import GalleryImage from '../../../components/Gallery/Gallary'
import { Button } from '@/components/ui/button'
import { PhoneCall } from 'lucide-react'

const page = () => {


    return (
        <div className='py-6 mx-4'>
            <div className=' rounded-sm border'>
                <div className='border rounded-sm m-1 w-full flex overflow-y-scroll h-96 2xl:h-screen'>

                    <GalleryImage />
                </div>
                <div className='w-full h-full m-4 '>
                    Hello world
                    <div className=' flex gap-x-2 pt-2'>
                        <p className='text-green-600'>Starting Price : </p>
                        <p > ₹ 25000</p>
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

export default page
