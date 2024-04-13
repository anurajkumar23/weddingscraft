import React from 'react'
import { FaWhatsapp } from 'react-icons/fa';
import { Button } from '../ui/button';
import { PhoneCall } from 'lucide-react';


interface PricingProps {
    id: string;
  }

const Pricing:React.FC<PricingProps> = ({id}) => {
    return (
        <div id={id} className='pb-4'>
            <div className='pb-4' >
                <div className=' border w-full shadow-md p-4 cursor-pointer rounded-sm'>
                    <p className='text-[#FD001D] text-2xl font-semibold pb-4 '>Starting Price</p>
                    <hr />
                    <div className=' flex gap-x-2'>
                        <p className='text-gray-600'>Starting Price : </p>
                        <p > ₹ 50,000</p>
                    </div>
                </div>
                <div className='pt-4 '>
                    <div className='border p-4 shadow-md'>
                        <p className='text-2xl font-semibold text-[#FD001D] '> Caterers</p>
                        <hr />
                        <div className='p-2'>
                            <div className=' flex justify-between text-center'>
                                <span className='relative flex gap-2'>
                                    <li >₹700 Per plate</li>
                                    <p className='text-xs flex items-center text-gray-500'>(taxes Extra) </p>
                                </span>
                                <p>Veg Plate</p>
                            </div>
                            <div className=' flex justify-between'>
                                <span className='relative flex gap-2'>
                                    <li>₹900 Per plate</li>
                                    <p className='text-xs flex items-center text-gray-500'>(taxes Extra) </p>
                                </span>
                                <p>Non Veg Plate</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border w-full shadow-md p-4 cursor-pointer rounded-sm  '>
                    <p className='text-[#FD001D] text-2xl font-semibold pb-4 '>Decorators</p>
                    <hr />
                    <div className=' flex gap-2'>
                        <p className='text-gray-600'>Starting Price : </p>
                        <p className='text-gray-400'> ₹ 15,000</p>
                    </div>
                </div>
                <div className=' border w-full shadow-md p-4 cursor-pointer rounded-sm  '>
                    <p className='text-[#FD001D] text-2xl font-semibold pb-4 '>Photographers</p>
                    <hr />
                    <div className=' flex gap-2'>
                        <p className='text-gray-600'>Starting Price : </p>
                        <p className='text-gray-400'> ₹ 15,000</p>
                    </div>
                </div>
            </div>
            <div className='justify-center flex gap-4 '>
                <Button className='p-6 gap-2 shadow-lg font-medium md:text-base text-sm ' variant="outline">
                    <FaWhatsapp className="text-green-500 w-7 h-7 " />
                    Check availability
                </Button>
                <Button className='font-medium md:text-base text-sm p-6 gap-2 shadow-lg bg-green-600 hover:bg-green-700 hover:text-white text-white' variant="outline">
                    <PhoneCall />
                    Pricing
                </Button>
            </div>
        </div>
    )
}

export default Pricing
   