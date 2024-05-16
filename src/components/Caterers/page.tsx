"use client"
import React, { useState } from 'react';
import { Button } from '../ui/button';
import Veg from "../../../public/Veg_symbol.svg"
import NonVeg from "../../../public/Non_veg_symbol.svg"
import Image from 'next/image';

import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
// import { GoCheckCircleFill } from 'react-icons/go';
import { IceCream, Martini, Sandwich, Soup } from 'lucide-react';
// import { IceCreamBowl } from 'lucide-react';

const CardPage = ({ color, name }: any) => {

    const FoodItems = [
        { name: 'Welcome Drinks', items: 2 },
        { name: 'Starter', items: 2 },
        { name: 'Welcome Drinks', items: 2 },
        { name: 'Starter', items: 2 },
        { name: 'Main Courses', items: 3 },
        { name: 'Salad', items: 2 },
        { name: 'Rice/Biryani', items: 1 },
        { name: 'Deserts', items: 2 },
    ]
    const servicesData = [
        {
            category: 'Welcome Drinks',
            items: ["Sprite", "CocaCola", "Mirinda", "Lemonade", "Iced Tea", "Fruit Punch"]
        },
        {
            category: 'Starters',
            items: ["Paneer Tikka", "Chicken Tikka", "Vegetable Spring Rolls", "Samosas", "Chicken Satay", "Bruschetta"]
        },
        {
            category: 'Main Course',
            items: ["Butter Chicken", "Veg Biryani", "Dal Makhani", "Tandoori Roti", "Chicken Curry", "Palak Paneer"]
        },
        {
            category: 'Desserts',
            items: ["Gulab Jamun", "Rasgulla", "Rasmalai", "Ice Cream", "Fruit Salad", "Kheer"]
        },
       
    ];

    const getIconForCategory = (category: string) => {
        switch (category) {
            case 'Welcome Drinks':
                return <Martini size={25} className="text-blue-500" />;
            case 'Attire':
                return <Martini size={25} className="text-purple-500" />;
            case 'Desserts':
                return <IceCream size={25} className="text-red-500" />;
            case 'Starters':
                return <Sandwich size={25} className="text-yellow-500" />;
            case 'Main Course':
                return <Soup size={25} className="text-green-500" />;
            default:
                return null;
        }
    };


    const [showAllServices, setShowAllServices] = useState(false);

    const toggleShowAllServices = () => {
        setShowAllServices(!showAllServices);
    };

    return (
        <div className="border">
            <div className={`mb-4 border p-4 rounded-sm ${color}`}>
                <div className='justify-center flex items-center'>
                    <h1 className='text-white font-bold text-2xl'>{name}</h1>
                </div>

            </div>
            <div className='flex px-4 items-center justify-between pb-2 '>
                <Button variant="secondary" className='gap-x-2 bg-slate-200'>
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
                    <div className='p-4 col-span-6 '>
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
                <div className='justify-center flex w-full '>
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <Button
                                variant="outline"
                                onClick={toggleShowAllServices}
                                className="text-blue-500 mt-4 border-blue-500 "
                            >
                                See Menu items
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent >
                            <AlertDialogHeader>
                                <AlertDialogTitle className='justify-center flex place-center'>Food Items</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogDescription>
                                <div className="grid grid-cols-2 mt-4">
                                    {servicesData.map((service, index) => (
                                        <div key={index} className="pb-4 flex items-center">
                                            {getIconForCategory(service.category)}
                                            <div>
                                                <h1 className="font-semibold">{service.category}</h1>
                                                <ul className="list-disc pl-6">
                                                    {service.items.map((item, idx) => (
                                                        <li key={idx}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </AlertDialogDescription>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Close</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    );
};

export default CardPage;