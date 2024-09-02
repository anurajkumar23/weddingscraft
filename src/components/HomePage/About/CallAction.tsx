/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { FunctionComponent } from "react";
import backgroundImage from "../../../../public/Design_elements/7xm-2.png";

export type CallToActionType = {
  className?: string;
};

const CallToAction: FunctionComponent<CallToActionType> = ({ className = "" }) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-center py-12 text-white text-center gap-8 ${className}`}
    >
      {/* Background Image */}
      <Image
        className="absolute inset-0 w-full h-full object-cover z-0"
        alt="Background"
        src={backgroundImage}
        layout="fill"
        quality={100}
      />

      {/* Content Section */}
      <div className="relative z-10 space-y-6 mx-10">
        <h1 className="text-4xl font-semibold leading-snug sm:text-3xl">
          Looking for the ultimate wedding planning partner?
        </h1>
        <p className="text-lg text-white/90">
          With us, you will get the full package of everything we have to offer: from event management to event coordination, theming, catering, décor & styling, and conference planning. Don't forget, we can also provide entertainment and venue sourcing too!
        </p>
      </div>

      {/* Call-to-Action Button */}
      <div className="relative z-10">
      <button className="bg-red-500 text-white py-3 px-8 rounded-full font-semibold hover:bg-red-600 transition">
          See Our Work
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
