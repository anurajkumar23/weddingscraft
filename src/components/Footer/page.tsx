import { FunctionComponent } from "react";
import BackgroundImage from "../../../public/Design_elements/7xm-3.png"
import Logo from "../../../public/Design_elements/logo.png"
import Instagram from "../../../public/Design_elements/Group-3.png"
import Twitter from "../../../public/Design_elements/Group.png"
import facebook from "../../../public/Design_elements/Group-1.png"
import Image from "next/image";


export type Footer1Type = {
  className?: string;
};

const Footer1: FunctionComponent<Footer1Type> = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch flex flex-row items-start justify-start py-[4.25rem] px-[4.625rem] box-border relative min-h-[24.75rem] max-w-full text-left text-[1.125rem] text-[#f16722]  mq750:pl-[2.313rem] mq750:pr-[2.313rem] mq750:box-border ${className}`}
    >
      <Image
        className="h-full w-full absolute !m-[0] right-[0rem] bottom-[-0.031rem] left-[0rem] max-w-full overflow-hidden object-cover"
        alt=""
        src={BackgroundImage}
      />
  
      <div className="w-[79.813rem] flex flex-row items-start justify-start gap-[6.75rem] max-w-full z-[1] text-[rgba(255,255,255,0.9)] font-[Poppins] mq750:gap-[1.688rem] mq1250:gap-[3.375rem] mq1250:flex-wrap">
        <div className="w-[4.181rem] flex flex-row items-start justify-start text-center font-['Noto_Sans_Carian']">
          <div className="flex-1 flex flex-row items-start justify-start">
            <div className="flex-1 flex flex-row items-start justify-start gap-[0.156rem]">
              <div className="h-[1.869rem] w-[1.4rem] relative hidden " />
              <Image
                className="self-stretch w-[1.4rem] relative max-h-full min-h-[1.875rem] z-[1]"
                loading="lazy"
                alt=""
                src={facebook}
              />
              <Image
                className="self-stretch w-[1.4rem] relative max-h-full min-h-[1.875rem] z-[1]"
                loading="lazy"
                alt=""
                src={Twitter}
              />
              <Image
                className="self-stretch w-[1.4rem] relative max-h-full min-h-[1.875rem] z-[1]"
                loading="lazy"
                alt=""
                src={Instagram}
              />
            </div>
            <Image
              className="w-28 h-8 absolute  top-[8.25rem] left-[4.625rem]  z-[2]"
              alt=""
              src={Logo}
            />
          </div>
        </div>
        <div className="w-[12.625rem] relative capitalize inline-block text-[1.188rem]">
          <p className="m-[0px] text-[1.688rem] leading-[2.188rem] font-semibold">
            Services
          </p>
          <p className="m-[0px] leading-[1.563rem]">&nbsp;</p>
          <p className="m-[0px] leading-[1.563rem]">event planning</p>
          <p className="m-[0px] leading-[1.563rem]">protocal service</p>
          <p className="m-[0px] leading-[1.563rem]">outside catering</p>
          <p className="m-[0px] leading-[1.563rem]">food and beverage</p>
          <p className="m-[0px] leading-[1.563rem]">venue planner</p>
          <p className="m-[0px] leading-[1.563rem]">{`Video & photography`}</p>
        </div>
        <h3 className="m-[0px] relative text-[1.188rem] leading-[1.563rem] font-normal font-[inherit]">
          <p className="m-[0px]">Quick Links</p>
          <p className="m-[0px]">&nbsp;</p>
          <p className="m-[0px]">Home</p>
          <p className="m-[0px]">About Us</p>
          <p className="m-[0px]">Service</p>
          <p className="m-[0px]">our work</p>
          <p className="m-[0px]">Contact Us</p>
        </h3>
        <div className="w-[28.375rem] flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[1.562rem] box-border gap-[1rem] max-w-full">
          <div className="relative leading-[1.563rem] capitalize inline-block min-h-[6.25rem]">
            <p className="m-[0px]">
              we would love to work with you on planning and
            </p>
            <p className="m-[0px]">
              organizing your events in order to make your dream Event come to
              life.
            </p>
          </div>
          <button className="bg-red-500 text-white py-3 px-8 rounded-full font-semibold hover:bg-red-600 transition">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer1;
