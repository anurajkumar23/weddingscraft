"use client";
import React, { useState } from "react";
import { GoCheckCircleFill } from "react-icons/go";
import { Button } from "../ui/button";
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

import Pricing from "./Pricing";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
} from "react-scroll";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import GalleryComponent from "../Gallery/GalleryComponent";
import ReviewRating from "../Review&Rating/Review&Rating";
import { BanquetDocument } from "@/customTypes/BanquetDocument";

const QuickInfo = ({ banquetData }: { banquetData: BanquetDocument }) => {
  console.log(banquetData,"😊😊😊😊")

  const servicesData = [
    "Lock on bedroom door",
    "Free Wifi",
    "Room service",
    "Swimming pool",
    "Gym",
    "Spa",
    "Restaurant",
    "Parking",
    "Airport shuttle",
    "Lock on bedroom door",
    "Free Wifi",
    "Room service",
    "Swimming pool",
    "Gym",
    "Spa",
  ];

  const [showAllServices, setShowAllServices] = useState(false);

  const toggleShowAllServices = () => {
    setShowAllServices(!showAllServices);
  };

  const [activeLink, setActiveLink] = useState("");

  const handleSetActiveLink = (to: string) => {
    setActiveLink(to);
  };
  const menuItems = [
    {
      id: 1,
      title: "Pricing",
    },
    {
      id: 2,
      title: "Services",
    },
    {
      id: 3,
      title: "Photos",
    },
    {
      id: 4,
      title: "Reviews",
    },
    {
      id: 5,
      title: "Reviews",
    },
    {
      id: 6,
      title: "Reviews",
    },
  ];

  return (
    <div>
      <div className="w-screen sticky top-0 z-10 sm:hidden ">
        <ScrollArea className=" whitespace-nowrap border">
          <div className="flex w-max space-x-6 p-4 bg-slate-200">
            {menuItems.map((menu) => (
              <p key={menu.id}>
                <Link
                  to={menu.title}
                  spy={true}
                  smooth={true}
                  offset={50}
                  duration={500}
                  onSetActive={() => handleSetActiveLink(menu.title)}
                  className={
                    activeLink === menu.title
                      ? "text-red-600 border-b border-red-600"
                      : ""
                  }
                >
                  {menu.title}
                </Link>
              </p>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="md:hidden">
        <Pricing id="Pricing" />
      </div>
      <div
        id="Services"
        className="container border w-full h-full rounded-sm bg-white py-6"
      >
        <div className="grid grid-cols-2">
          <h1 className="text-2xl font-medium mb-6">Quick Information</h1>
          <h1 className="text-2xl font-medium mr-6 mb-6">Timings</h1>
          <div>
            <h1 className="text-lg text-gray-600 ">Year of Establishment</h1>
            <h1 className="text-lg font-semibold">{banquetData.yearOfEstd}</h1>
          </div>
          <div className="flex space-x-4">
            <h1 className="font-medium text-lg">{banquetData.operatingDays}</h1>
            <h1 className="text-gray-700">Open {banquetData.openHours}</h1>
          </div>
        </div>
      </div>
      <div id="Services" className="container border rounded-sm w-full h-full">
        <div className="grid grid-cols-3 py-6">
          <div>
            <h1 className="text-2xl font-medium mb-6">Type</h1>
            <div className="flex space-x-2">
              <GoCheckCircleFill size={25} className="text-green-600" />
              <h1 className="font-semibold">{banquetData.type}</h1>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-medium mb-6">Seating Capacity</h1>
            <div className="flex space-x-2">
              <GoCheckCircleFill size={25} className="text-green-600" />
              <h1 className="font-semibold">
                Upto {banquetData.capacity} Persons
              </h1>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-medium mb-6">Availability</h1>

            {banquetData.availability &&
              banquetData.availability.map((item: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, index: React.Key | null | undefined) => {
                return (
                  <div key={index} className="flex gap-2">
                    <GoCheckCircleFill size={25} className="text-green-600" />
                    <h1 className="font-semibold">{item}</h1>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div
        id="Services"
        className="container border w-full h-full rounded-sm bg-white py-6"
      >
        <h1 className="text-2xl font-medium mb-6">Services</h1>
        <div className="grid grid-cols-2">
          {banquetData.services.slice(0, 5).map((service: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, index: React.Key | null | undefined) => (
            <div key={index} className="flex space-x-2 pb-3">
              <GoCheckCircleFill size={25} className="text-green-600" />
              <h1 className="font-semibold">{service}</h1>
            </div>
          ))}
        </div>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button
              variant="outline"
              onClick={toggleShowAllServices}
              className="text-blue-500 mt-4 border-blue-500"
            >
              View All
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Services</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              <div className="grid grid-cols-2 mt-4">
                {servicesData.map((service, index) => (
                  <div key={index} className="flex space-x-2 pb-3">
                    <GoCheckCircleFill size={25} className="text-green-600" />
                    <h1 className="font-semibold">{service}</h1>
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
        <div id="Photos" className="md:w-full w-screen mx-auto overflow-hidden">
        <GalleryComponent  initialData={banquetData.gallery}  categoryId={banquetData._id}   category='banquet' />
      </div>
     <div id="Reviews">
      <ReviewRating data={banquetData} category="Banquet"/>
     </div>
    </div>
  );
};

export default QuickInfo;
