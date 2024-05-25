"use client";
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

import { IceCream, Martini, Plus, Sandwich, Soup, X, Check, ChevronDown, ChevronUp } from 'lucide-react';

const CardPage = ({ color, name, Caterer }: any) => {

    console.log(Caterer, "🐷🐷🐷🐷🐷🥳🎉")
    const foodData: {
        veg: Record<string, string[]>;
        nonveg: Record<string, string[]>;
        addon: Record<string, { name: string; price: number }[]>;
    } = {
        "veg": {
            "starter": ["Paneer Tikka", "Hara Bhara Kabab"],
            "maincourse": ["Paneer Butter Masala", "Vegetable Biryani"],
            "desert": ["Gulab Jamun", "Rasgulla"],
            "welcomedrink": ["Mango Lassi", "Buttermilk"],
            "breads": ["Naan", "Roti"],
            "rice": ["Jeera Rice", "Veg Pulao"]
        },
        "nonveg": {
            "starter": ["Chicken Tikka", "Fish Fry"],
            "maincourse": ["Butter Chicken", "Fish Curry", "Chicken Butter Masala"],
            "desert": ["Rasmalai", "Shahi Tukda"],
            "welcomedrink": ["Sweet Lime Soda", "Masala Chaas"],
            "breads": ["Naan", "Tandoori Roti"],
            "rice": ["Chicken Biryani", "Mutton Biryani"]
        },
        "addon": {
            "starter": [
                { "name": "Samosa", "price": 30 },
                { "name": "Pakora", "price": 25 }
            ],
            "maincourse": [
                { "name": "Chole Bhature", "price": 50 },
                { "name": "Dosa", "price": 40 }
            ],
            "desert": [
                { "name": "Ice Cream", "price": 35 },
                { "name": "Gajar Ka Halwa", "price": 45 }
            ],
            "welcomedrink": [
                { "name": "Cold Coffee", "price": 40 },
                { "name": "Lemonade", "price": 30 }
            ],
            "breads": [
                { "name": "Kulcha", "price": 20 },
                { "name": "Puri", "price": 15 }
            ],
            "rice": [
                { "name": "Fried Rice", "price": 35 },
                { "name": "Puliyogare", "price": 30 }
            ]
        }
    };

    const getIconForCategory = (category: string) => {
        switch (category) {
            case 'welcomedrink':
                return <Martini size={25} className="text-blue-500" />;
            case 'starter':
                return <Sandwich size={25} className="text-yellow-500" />;
            case 'maincourse':
                return <Soup size={25} className="text-green-500" />;
            case 'desert':
                return <IceCream size={25} className="text-red-500" />;
            default:
                return null;
        }
    };

    const [showAllServices, setShowAllServices] = useState(false);
    const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
    const [foodType, setFoodType] = useState<'veg' | 'nonveg'>('veg');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

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

    const handleFoodTypeChange = (type: 'veg' | 'nonveg') => {
        setFoodType(type);
    };

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category === activeCategory ? null : category);
    };

    return (
        <div className="border">
            <div className={`mb-4 border p-4 rounded-sm ${color}`}>
                <div className='justify-center flex items-center'>
                    <h1 className='text-white font-bold text-2xl'>{name}</h1>
                </div>
            </div>
            <div className='flex px-4 items-center justify-between pb-2 '>
                <Button
                    variant="secondary"
                    className={`gap-x-2 ${foodType === 'veg' ? 'bg-slate-200' : 'bg-slate-100'}`}
                    onClick={() => handleFoodTypeChange('veg')}
                >
                    <Image
                        src={Veg}
                        alt="Veg"
                        width={20}
                        height={20}
                    />
                    Vegetarian
                </Button>
                <Button
                    variant="secondary"
                    className={`gap-x-2 ${foodType === 'nonveg' ? 'bg-slate-200' : 'bg-slate-100'}`}
                    onClick={() => handleFoodTypeChange('nonveg')}
                >
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
                        {Object.keys(foodData[foodType]).map((category, index) => (
                            <div key={index} className='pb-2 text-sm '>
                                <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
                                {/* <ul className="list-disc pl-6">
                                    {foodData[foodType][category].map((item: string, idx: number) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul> */}
                            </div>
                        ))}
                    </div>
                    <div className='col-span-4 text-center'>
                        <h1 className='font-semibold'>Packages</h1>
                        <div className='text-xs flex justify-center'>
                            <h1 className='font-semibold pb-4'> ₹ 700 </h1>
                            <h1>/Plate</h1>
                        </div>
                        {Object.keys(foodData[foodType]).map((category, index) => (
                            <div key={index} className='pb-2 text-sm'>
                                <h1>{foodData[foodType][category].length}</h1>
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
                <div>
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
                                    {Object.keys(foodData.addon).map((category, index) => (
                                        <div key={index}>
                                            <Button
                                                variant="ghost"
                                                className="flex  items-center justify-between w-full"
                                                onClick={() => handleCategoryChange(category)}
                                            >
                                                <span className={`font-semibold ${activeCategory === category ? 'text-blue-500' : 'text-black'}`}>
                                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                                </span>
                                                {activeCategory === category ? <ChevronUp /> : <ChevronDown />}
                                            </Button>
                                            {activeCategory === category && foodData.addon[category].map((service, idx) => (
                                                <div key={idx} className="mx-4 pb-4 justify-between flex items-center">
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
                                    {Object.keys(foodData[foodType]).map((category, index) => (
                                        <div key={index} className="pb-4 flex items-center">
                                            {getIconForCategory(category)}
                                            <div>
                                                <h1 className="font-semibold">{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
                                                <ul className="list-disc pl-6">
                                                    {foodData[foodType][category].map((item, idx) => (
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
