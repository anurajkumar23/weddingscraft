import { FunctionComponent } from "react";
import BackgroundImage from "../../../public/Design_elements/7xm-3.png";
import Logo from "../../../public/Design_elements/logo.png";
import Instagram from "../../../public/Design_elements/Group-3.png";
import Twitter from "../../../public/Design_elements/Group.png";
import Facebook from "../../../public/Design_elements/Group-1.png";
import Image from "next/image";

export type Footer1Type = {
  className?: string;
};

const Footer1: FunctionComponent<Footer1Type> = ({ className = "" }) => {
  return (
    <div className={`relative py-16 md:px-8 text-white bg-gray-900 ${className}`}>
      {/* Background Image */}
      <Image
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        alt="Background"
        src={BackgroundImage}
      />

      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
          {/* Left Section: Social Media & Logo */}
          <div>
            <div className="flex justify-center md:justify-start space-x-3 pb-8">
              <Image className="w-5 h-6" alt="Facebook" src={Facebook} />
              <Image className="w-5 h-6" alt="Twitter" src={Twitter} />
              <Image className="w-5 h-6" alt="Instagram" src={Instagram} />
            </div>
            <Image className="w-28 mx-auto md:mx-0 mb-6" alt="Logo" src={Logo} />
          </div>

          {/* Center Section: Services */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Services</h2>
            <ul className="space-y-2 text-sm">
              <li>Event Planning</li>
              <li>Protocol Service</li>
              <li>Outside Catering</li>
              <li>Food and Beverage</li>
              <li>Venue Planner</li>
              <li>Video & Photography</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li>Home</li>
              <li>About Us</li>
              <li>Service</li>
              <li>Our Work</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <p className="text-sm mb-6">
              We would love to work with you on planning and organizing your events to make your dream event come to life.
            </p>
            <button className="bg-red-500 text-white py-3 px-8 rounded-full font-semibold hover:bg-red-600 transition">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer1;
