// import Image from "next/image";
import React from "react";
import { RiFacebookLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";

export default function footer() {
  return (
    <div className="pt-[80px] bg-[#222222] mt-20">
      <div className="flex md:flex-row flex-col text-[#888F93] mx-[10%]  ">
        <div className="md:w-[30%] ">
          <p className="uppercase mb-[7%]">Our Mission</p>
          <p className="">
          Driven by compassion, our NGO strives to uplift the disadvantaged through targeted and effective initiatives.
We envision a world where every individual has access to essential resources and opportunities for a brighter future.
          </p>
          <div className="flex mt-5 mb-5">
            <RiFacebookLine className=" w-10 h-5 cursor-pointer" />
            <FaInstagram className=" w-10 h-5 cursor-pointer" />
          </div>

          <p>Phone: +958xxxxxxx</p>
        </div>
        <div className="md:w-[50%] my-auto ">
          {/* <Image
            src="/images/asha-logo-1.png"
            width={1000}
            height={1000}
            loading="lazy"
            alt="logo"
            className=" h-[4rem] w-[20rem] mx-auto my-auto"
          /> */}
        </div>
        <div className="md:w-[20%] md:mb-[0]  mb-[7%]">
            <p className="mb-[7%]">Useful Links</p>
            <p><Link href="/#about"  >About Us</Link></p>
            <p><Link href="/#gallery">Gallery</Link></p>

            <p><Link href="/#booking">Donate</Link></p>
         
            <p><Link href="/#contact">Contact</Link></p>
        
        </div>
      </div>
      <hr className=" text-[#888F93] mb-5 pb-5 mx-[10%]"/>
      <div className="text-center text-[#888F93] pb-5">
      <p>Asha foundation © 2024. All rights reserved.</p> 
        Designed & Developed By <strong>Meow corder</strong> 
      </div>
    </div>
  );
}