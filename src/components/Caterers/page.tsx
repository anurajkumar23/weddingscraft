"use client"
import React, { useState } from 'react';
import { Button } from '../ui/button';
import Veg from "../../../public/Veg_symbol.svg";
import NonVeg from "../../../public/Non_veg_symbol.svg";
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

import { IceCream, Martini, Plus, Sandwich, Soup, X, Check } from 'lucide-react'; // Import Check and X icons

const CardPage = ({ color, name }: any) => {
    const FoodItems = [
        { name: 'Welcome Drinks', items: 2 },
        { name: 'Starter', items: 2 },
        { name: 'Main Courses', items: 3 },
        { name: 'Salad', items: 2 },
        { name: 'Rice/Biryani', items: 1 },
        { name: 'Desserts', items: 2 },
    ];

    const AddFood = [
        { name: 'Briyani', price: 130 },
        { name: 'Nan', price: 50 },
        { name: 'Matter Paneer', price: 200 },
        { name: 'Suwar🐷', price: 400 },
    ];

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
            case 'Starters':
                return <Sandwich size={25} className="text-yellow-500" />;
            case 'Main Course':
                return <Soup size={25} className="text-green-500" />;
            case 'Desserts':
                return <IceCream size={25} className="text-red-500" />;
            default:
                return null;
        }
    };

    const [showAllServices, setShowAllServices] = useState(false);
    const [selectedFoods, setSelectedFoods] = useState<string[]>([]);

    const toggleShowAllServices = () => {
        setShowAllServices(!showAllServices);
    };

    const handleAddFood = (foodName: string) => {
        if (!selectedFoods.includes(foodName)) {
            setSelectedFoods([...selectedFoods, foodName]);
        }
    };

    const handleRemoveFood = (index: number) => {
        const updatedFoods = [...selectedFoods];
        updatedFoods.splice(index, 1);
        setSelectedFoods(updatedFoods);
    };

    const isFoodSelected = (foodName: string) => {
        return selectedFoods.includes(foodName);
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
                    />
                    Vegetarian
                </Button>
                <Button variant="secondary" className='gap-x-2'>
                    <Image
                        src={NonVeg}
                        alt="NonVeg"
                        width={20}
                        height={20}
                    />
                    Non-Vegetarian
                </Button>
            </div>
            <div className='border-t-4 rounded-sm border-green-600 p-2'>
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
                <div className='w-full'>
                    {selectedFoods.map((food, index) => (
                        <div key={index} className='justify-between mx-5  mb-2 flex  text-sm'>
                            <h1>{food}</h1>
                            <Button
                                variant="outline"
                                className="text-red-600"
                                onClick={() => handleRemoveFood(index)}
                            >
                                <X />
                            </Button>
                        </div>
                    ))}
                </div>
                <div >

                    <AlertDialog>
                        <AlertDialogTrigger className='justify-between w-full flex '>
                            <Button
                                variant="outline"
                                className="text-red-600 border-red-600 "

                            >
                                Add Food items
                            </Button>
                            <Button
                                variant="outline"
                                className='text-green-600 border-green-500 mr-3'
                            >
                                <Plus />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className='md:w-1/3'>
                            <AlertDialogHeader>
                                <AlertDialogTitle className='justify-center flex place-center'>Add Foods</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogDescription>
                                <div className="grid mt-4">
                                    {AddFood.map((service, index) => (
                                        <div key={index} className="pb-4 justify-between flex items-center">
                                            <h1>{service.name}</h1>
                                            <Button
                                                variant="outline"
                                                className='text-green-600 border-green-500 mr-3'
                                                onClick={() => handleAddFood(service.name)}
                                            >
                                                {isFoodSelected(service.name) ? <Check /> : <Plus />}
                                            </Button>
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


