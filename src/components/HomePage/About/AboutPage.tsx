/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { FunctionComponent } from "react";
import banquetProp from "../../../../public/Design_elements/befunky_layer(5) 1.png";
import weddingCouple from "../../../../public/Design_elements/pexels-1054048-12655154 1.png"
import CallToAction from "./CallAction";

export type AboutTitleType = {
    className?: string;
};

const AboutTitle: FunctionComponent<AboutTitleType> = ({ className = "" }) => {
    return (
        <div className={`flex flex-col items-center py-12 mx-16 gap-10 ${className}`}>
            {/* Section Title */}
            <div className="text-center">
                <h1 className="text-4xl font-semibold text-gray-800">
                    About <span className="text-red-500">Dream Wedding</span>
                </h1>
                {/* Decorative Divider */}
                <div className="flex justify-center items-center gap-4 mt-4">
                    <hr className="w-20 border-t-2 border-gray-400" />
                    <Image src={banquetProp} alt="Decoration" width={50} height={50} />
                    <hr className="w-20 border-t-2 border-red-400" />
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-wrap lg:flex-nowrap gap-8 lg:gap-16 items-start pb-10">
                {/* Image Section */}
                <Image
                    className="object-cover rounded-lg"
                    src={weddingCouple}
                    alt="Wedding Couple"
                    width={400}
                    height={600}
                    loading="lazy"
                />
                
                {/* Text Content */}
                <div className="flex-1 space-y-6">
                    <p className="text-lg text-gray-700">
                        At Dream Wedding, we believe that every love story deserves to be celebrated in a way that’s as unique and beautiful as the couple themselves. As a premier wedding management service, we specialize in turning your wedding dreams into reality. From intimate gatherings to grand celebrations, our team is dedicated to crafting unforgettable experiences tailored to your vision.
                    </p>
                    <p className="text-lg text-gray-700">
                        Dream Wedding takes care of every detail, ensuring a seamless and stress-free journey from engagement to "I do." We work closely with the finest vendors, venues, and artisans to create a personalized celebration that reflects your style, personality, and love story.
                    </p>
                    <p className="text-lg text-gray-700">
                        Whether you're dreaming of a traditional ceremony or a modern affair, Dream Wedding is here to bring your vision to life with creativity, elegance, and a touch of magic. Let us handle the logistics, so you can focus on cherishing every moment of your special day.
                    </p>
                    <p className="text-lg text-gray-700">
                        Your dream wedding starts here.
                    </p>
                    
                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4">
                        <button className="bg-red-500 text-white py-3 px-8 rounded-full font-semibold hover:bg-red-600 transition">
                            Contact Us
                        </button>
                        <button className="bg-red-500 text-white py-3 px-8 rounded-full font-semibold hover:bg-red-600 transition">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
            <CallToAction/>
        </div>
    );
};

export default AboutTitle;
