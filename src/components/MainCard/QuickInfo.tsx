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
import ImageContainer from "../Gallery/ImageContainer";
import UserReview from "./UserReview";
import { Rate } from "antd";
import Pricing from "./Pricing";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
} from "react-scroll";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { BanquetVenue } from "./page";
import GalleryComponent from "../Gallery/GalleryComponent";
import ReviewRating from "../Review&Rating/Review&Rating";

const QuickInfo = ({ banquetData }: { banquetData: BanquetVenue }) => {
  console.log(banquetData,"😊😊😊😊")
  const userReviews = [
    {
      id: "1",
      name: "Anuraj kumar",
      date: "27 july 2024",
      heading: "Nice",
      ratings: 4.5,
      description:
        "Average Hall with more ambiance and less quality food. The hall is completely well decorated but related to food the quality is too average and up to mark as per expected. Visited there for friends functions. I liked all the surroundings and atmosphere but food taste upsets me more.",
    },
    {
      id: "2",
      name: "Gunjan kumar",
      date: "27 july 2024",
      heading: "Amazing Experience",
      ratings: 3,
      description:
        "One the best hotels in Thane location where you can find good quality of food with good view of Thane They have huge capicity of banquet also where they give good rates to clients they also have live music in every evening where one can enjoy their dinner with family i strongly recommend to this hotel",
    },
  ];

  // const Banquet = [
  //   {
  //     id: "1",
  //     src: Banquet1,
  //     alt: "Banquet",
  //     title: "Photos",
  //     links: "BanquetHall",
  //     numbers: "45",
  //   },
  //   {
  //     id: "2",
  //     src: Banquet1,
  //     alt: "Banquet",
  //     title: "Videos",
  //     links: "BanquetHall",
  //     numbers: "4",
  //   },
  //   // { id: "2", src: Banquet2, alt: "Banquet", title: "Decorators" },
  //   // { id: "3", src: Catering, alt: "Catering", title: "Caterers" },
  //   // { id: "4", src: Photographer, alt: "Photographer", title: "Photographers" }
  // ];

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
              banquetData.availability.map((item, index) => {
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
          {banquetData.services.slice(0, 5).map((service, index) => (
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
        <div id="Photos">
        <GalleryComponent  initialData={banquetData.gallery}  categoryId={banquetData._id}   category='banquet' />
      </div>
{/* <ReviewRating data={banquetData}/> */}
    </div>
  );
};

export default QuickInfo;
