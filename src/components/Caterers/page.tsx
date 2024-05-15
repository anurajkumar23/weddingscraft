import React from 'react';
import { Button } from '../ui/button';
import Veg from "../../../public/Veg_symbol.svg"
import NonVeg from "../../../public/Non_veg_symbol.svg"
import Image from 'next/image';
import Item from 'antd/es/list/Item';

const CardPage = ({ color, name }: any) => {

    const FoodItems=[
        {name:'Welcome Drinks', items:2},
        {name:'Starter', items:2},
        {name:'Welcome Drinks', items:2},
        {name:'Starter', items:2},
        {name:'Main Courses', items:3},
        {name:'Salad', items:2},
        {name:'Rice/Biryani', items:1},
        {name:'Deserts', items:2},
    ]


    return (
        <div className="border">
            <div className={`mb-4 border p-2 rounded-sm ${color}`}>
                <div className='justify-center flex items-center'>
                    <h1 className='text-white font-semibold'>{name}</h1>
                </div>

            </div>
            <div className='flex px-4 items-center justify-between pb-2 '>
                <Button variant="secondary" className='gap-x-2'>
                    <Image
                        src={Veg}
                        alt="Veg"
                        width={20}
                        height={20}
                    ></Image>
                    Vegetarian
                </Button>
                <Button variant="secondary" className='gap-x-2'>
                    <Image
                        src={NonVeg}
                        alt="NonVeg"
                        width={20}
                        height={20}
                    ></Image>
                    Non-Vegetarian
                </Button>
            </div>
            <div className='border-t-4 rounded-sm border-green-600 p-2 '>
                <div className='grid grid-cols-10'>
                    <div className='p-2 col-span-6 '>
                        <h1 className='font-semibold pb-4'>Food Items</h1>
                        {FoodItems.map((item, index) => (
                            <div key={index} className='pb-2 text-sm '>
                                <h1>{item.name}</h1>
                            </div>
                        ))}
                    </div>
                    <div className='col-span-4 text-center'>
                        <h1 className='font-semibold'>Packages</h1>
                        <div className='text-xs flex justify-center'>
                        <h1 className='font-semibold pb-4'> ₹ 700 </h1>
                        <h1>/Plate</h1>
                        </div>
                        {FoodItems.map((item, index) => (
                            <div key={index} className='pb-2 text-sm'>
                                <h1>{item.items}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardPage;