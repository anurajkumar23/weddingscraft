"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "../../../public/Dream Wedding Logo_20240417_103338_0000.png";

import { navLinks } from "@/lib/constants";
import { NavLink } from "@/lib/types";
import { User } from "lucide-react";

const LeftSideBar: React.FC = () => {
  const pathname = usePathname();
  const [categoryOpen, setCategoryOpen] = useState(false);

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the default link behavior
    setCategoryOpen(!categoryOpen);
  };

  return (
    <div className="h-full left-0 top-0 sticky p-4 flex flex-col gap-16 bg-blue-2 shadow-xl max-lg:hidden">
      {/* <Image src={logo} alt="logo" width={200} height={70} priority={false} loading="lazy"/> */}

      <div className="flex flex-col gap-3 ">
        <div>
          <Link
            href="/user/profile"
            className={`flex gap-4 p-4 text-body-medium hover:bg-red-100 hover:rounded-md ${pathname === "/user/profile" ? "text-red-600 bg-red-100 rounded-md" : "text-grey-1"
              }`}
          >
            <User /> <p>Profile</p>
          </Link>
        </div>
        {navLinks.map((link: NavLink) => (
          <div key={link.label}>
            <Link
              href={link.url}
              className={`flex gap-4 p-4 text-body-medium hover:bg-red-100 hover:rounded-md ${pathname === link.url ? "text-red-600 bg-red-100 rounded-md" : "text-grey-1"
                }`}
            >
              {link.icon} <p>{link.label}</p>
            </Link>
          </div>
        ))}
      </div>
      {/* <div className="flex gap-4 text-body-medium items-center">
        <p>Edit Profile</p>
      </div> */}
    </div>
  );
};

export default LeftSideBar;
