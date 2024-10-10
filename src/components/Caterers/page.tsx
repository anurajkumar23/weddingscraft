"use client";
import React, { useState, useEffect } from 'react';
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

interface Props {
    name: string;
    veg: Record<string, string[]>;
    nonveg: Record<string, string[]>;
    price: number;
    addon: Record<string, { name: string; price: number }[]>;
}

interface SelectedFood {
    name: string;
    price: number;
}

const CardPage: React.FC<Props> = ({ name, veg, nonveg, addon, price }) => {
    const getColor = (name: string) => {
        switch (name.toLowerCase()) {
            case 'basic':
                return 'bg-gradient-to-br from-indigo-400 to-purple-700';
            case 'standard':
                return 'bg-gradient-to-br from-amber-500 to-pink-500';
            case 'deluxe':
                return 'bg-gradient-to-br from-emerald-400 to-cyan-400';
            default:
                return 'bg-gradient-to-br from-gray-400 to-gray-700';
        }
    };

    const [selectedFoods, setSelectedFoods] = useState<SelectedFood[]>([]);
    const [foodType, setFoodType] = useState<'veg' | 'nonveg'>('veg');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [totalPrice, setTotalPrice] = useState<number>(price);

    useEffect(() => {
        const addonTotal = selectedFoods.reduce((sum, food) => sum + Number(food.price), 0); // Ensure price is treated as number
        setTotalPrice(Number(price) + addonTotal); // Ensure total price is calculated as numbers
    }, [selectedFoods, price]);
    


    const handleAddFood = (foodName: string, foodPrice: number) => {
        if (!selectedFoods.some(food => food.name === foodName)) {
            setSelectedFoods([...selectedFoods, { name: foodName, price: foodPrice }]);
        }
    };

    const handleRemoveFood = (index: number) => {
        const updatedFoods = [...selectedFoods];
        updatedFoods.splice(index, 1);
        setSelectedFoods(updatedFoods);
    };

    const isFoodSelected = (foodName: string) => selectedFoods.some(food => food.name === foodName);

    const handleFoodTypeChange = (type: 'veg' | 'nonveg') => setFoodType(type);

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category === activeCategory ? null : category);
    };

    const getIconForCategory = (category: string) => {
        switch (category) {
            case 'welcomedrink':
                return <Martini size={20} className="text-blue-500" />;
            case 'starter':
                return <Sandwich size={20} className="text-yellow-500" />;
            case 'maincourse':
                return <Soup size={20} className="text-green-500" />;
            case 'desert':
                return <IceCream size={20} className="text-red-500" />;
            default:
                return null;
        }
    };

    const handleOrder = () => {
        const orderDetails = {
            packageName: name,
            basePrice: price,
            foodType: foodType,
            addons: selectedFoods,
            totalPrice: totalPrice
        };
        console.log("Order Details:", orderDetails);
    };

    return (
        <div className="border rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className={`p-6 ${getColor(name)}`}>
                <h1 className='text-white font-bold text-2xl text-center'>{name}</h1>
            </div>
            <div className='flex px-4 py-3 items-center justify-between bg-gray-50'>
                <Button
                    variant="secondary"
                    className={`flex-1 mr-2 ${foodType === 'veg' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => handleFoodTypeChange('veg')}
                >
                    <Image
                        src={Veg}
                        alt="Veg"
                        width={16}
                        height={16}
                        className="mr-2"
                    />
                    Veg
                </Button>
                <Button
                    variant="secondary"
                    className={`flex-1 ml-2 ${foodType === 'nonveg' ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => handleFoodTypeChange('nonveg')}
                >
                    <Image
                        src={NonVeg}
                        alt="NonVeg"
                        width={16}
                        height={16}
                        className="mr-2"
                    />
                    Non-Veg
                </Button>
            </div>
            <div className='p-4'>
                <div className='grid grid-cols-2 gap-4 mb-4'>
                    <div>
                        <h2 className='font-semibold text-lg mb-2'>Food Items</h2>
                        {Object.keys(foodType === 'veg' ? veg : nonveg).map((category, index) => (
                            <div key={index} className='mb-2'>
                                <h3 className='font-medium text-sm text-gray-600'>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                            </div>
                        ))}
                    </div>
                    <div className='text-right'>
                        <h2 className='font-semibold text-lg mb-2'>Quantity</h2>
                        {Object.keys(foodType === 'veg' ? veg : nonveg).map((category, index) => (
                            <div key={index} className='mb-2'>
                                <span className='text-sm font-medium text-gray-600'>
                                    {(foodType === 'veg' ? veg[category] : nonveg[category]).length}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='text-center mb-4'>
                    <span className='text-2xl font-bold text-gray-800'>₹ {totalPrice}</span>
                    <span className='text-sm text-gray-600'>/Plate</span>
                </div>
                {selectedFoods.length > 0 && (
                    <div className='mb-4 p-3 bg-gray-100 rounded-md'>
                        <h3 className='font-semibold mb-2'>Selected Add-ons:</h3>
                        {selectedFoods.map((food, index) => (
                            <div key={index} className='flex justify-between items-center mb-2 last:mb-0'>
                                <span className='text-sm'>{food.name} (₹{food.price})</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:text-red-800 p-1"
                                    onClick={() => handleRemoveFood(index)}
                                >
                                    <X size={16} />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
                <div className='flex flex-col space-y-3'>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" className="w-full text-green-600 border-green-600 hover:bg-green-50">
                                Add Food Items
                                <Plus size={16} className="ml-2" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className='max-w-md'>
                            <AlertDialogHeader>
                                <AlertDialogTitle className='text-center'>Add Foods</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogDescription>
                                <div className="space-y-2 mt-4">
                                    {Object.keys(addon).map((category, index) => (
                                        <div key={index} className="border rounded-md overflow-hidden">
                                            <Button
                                                variant="ghost"
                                                className="flex items-center justify-between w-full p-3"
                                                onClick={() => handleCategoryChange(category)}
                                            >
                                                <span className={`font-semibold ${activeCategory === category ? 'text-blue-600' : 'text-gray-800'}`}>
                                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                                </span>
                                                {activeCategory === category ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </Button>
                                            {activeCategory === category && (
                                                <div className="bg-gray-50 p-3 space-y-2">
                                                    {addon[category].map((service, idx) => (
                                                        <div key={idx} className="flex justify-between items-center">
                                                            <span className="text-sm">{service.name} (₹{service.price})</span>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className={`${isFoodSelected(service.name) ? 'bg-green-100 text-green-700' : 'text-gray-600'}`}
                                                                onClick={() => handleAddFood(service.name, service.price)}
                                                            >
                                                                {isFoodSelected(service.name) ? <Check size={16} /> : <Plus size={16} />}
                                                            </Button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </AlertDialogDescription>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Close</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full text-blue-600 border-blue-600 hover:bg-blue-50"
                            >
                                See Menu Items
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className='max-w-2xl'>
                            <AlertDialogHeader>
                                <AlertDialogTitle className='text-center'>Food Items</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogDescription>
                                <div className="grid grid-cols-2 gap-6 mt-4">
                                    {Object.keys(foodType === 'veg' ? veg : nonveg).map((category, index) => (
                                        <div key={index} className='space-y-2'>
                                            <div className="flex items-center">
                                                {getIconForCategory(category)}
                                                <h3 className="ml-2 font-semibold">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                                            </div>
                                            <ul className="list-disc pl-6 space-y-1">
                                                {(foodType === 'veg' ? veg[category] : nonveg[category]).map((item: string, idx: number) => (
                                                    <li key={idx} className="text-sm">{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </AlertDialogDescription>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Close</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <Button
                        variant="default"
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        onClick={handleOrder}
                    >
                        Order Now
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CardPage;