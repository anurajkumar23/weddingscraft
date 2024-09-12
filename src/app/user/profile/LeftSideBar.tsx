"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "@/lib/constants";
import { NavLink } from "@/lib/types";
import { LogOut, LayoutDashboard, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useAuth } from "@/app/authContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
// import { IsAdminOrSeller } from "@/utils/protect/protect";



const LeftSideBar: React.FC = () => {
  const pathname = usePathname();
  // const [categoryOpen, setCategoryOpen] = useState(false);
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter()

  // const handleCategoryClick = (e: React.MouseEvent) => {
  //   e.preventDefault(); // Prevent the default link behavior
  //   setCategoryOpen(!categoryOpen);
  // };

  function handlelogout() {
    localStorage.clear()
    setUser(null)
    router.push("/")

  }

  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }


  return (
    <div className={`relative flex flex-col h-full shadow-md dark:shadow-gray-700 bg-background transition-all ${isOpen ? ' w-full min-w-60 max-w-72 py-3 p-2 ' : ' w-0 min-w-0 max-w-0 '}`}>
      {/* <Image src={logo} alt="logo" width={200} height={70} priority={false} loading="lazy"/> */}
      <div className="absolute top-2 -right-14 z-50">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} >
          {isOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
        </Button>
      </div>
      <div className=" gap-3 flex flex-col h-full w-full overflow-hidden ">
        {/* <IsAdminOrSeller> */}
        <Link
          href="/user/profile/dashboard"
          className={`flex gap-4 p-4 text-body-medium hover:bg-red-100 hover:rounded-md ${pathname === "/user/profile/dashboard" ? "text-red-600 bg-red-100 rounded-md" : "text-grey-1"
            }`}
        >
          <LayoutDashboard /> <p>Dashboard</p>
        </Link>
        {/* </IsAdminOrSeller> */}
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
          <LogOut /><p className="cursor-pointer">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
