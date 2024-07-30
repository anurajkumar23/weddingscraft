"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "../../../public/Dream Wedding Logo_20240417_103338_0000.png";

import { navLinks } from "@/lib/constants";
import { NavLink } from "@/lib/types";
import { User,  LogOut } from "lucide-react";
import { useAuth } from "@/app/authContext";
import { useRouter } from "next/navigation"; 



const LeftSideBar: React.FC = () => {
  const pathname = usePathname();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const { user, setUser } = useAuth();
  const router = useRouter()

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the default link behavior
    setCategoryOpen(!categoryOpen);
  };

  function handlelogout(){
    localStorage.clear()
    setUser(null)
    router.push("/")
  
  }


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
             <div  
             onClick={handlelogout}            
              className={`flex gap-4 p-4 text-body-medium hover:bg-red-100 hover:rounded-md  cursor-pointer "text-grey-1"
                }`}
            >
              <LogOut/><p className="cursor-pointer">Logout</p>
            </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
