"use client";

import React, { useEffect, useState } from "react";
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


const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addListener(listener)
    return () => media.removeListener(listener)
  }, [matches, query])

  return matches
}

const LeftSideBar: React.FC = () => {
  const pathname = usePathname();
  const { user, setUser } = useAuth();
  const isLargeScreen = useMediaQuery("(min-width: 768px)")
  const router = useRouter()
 
  function handlelogout() {
    localStorage.clear()
    setUser(null)
    router.push("/")

  }

  useEffect(() => {
    setIsOpen(isLargeScreen)
  }, [isLargeScreen])

  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }


  return (
    <section className={`relative flex flex-col h-full shadow-md dark:shadow-gray-700 bg-background transition-all ${isOpen ? ' w-full min-w-60 max-w-72 py-3 p-2 ' : ' w-0 min-w-0 max-w-0 '}`}>
      <div className="absolute top-0 -right-14 z-50">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} >
          {isOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
        </Button>
      </div> 
      <main className="gap-3 flex flex-col h-full w-full overflow-hidden">
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
        <div className='mt-auto'>
          <footer className='bg-background w-full border-t border-primary shadow-md font-semibold text-xs text-center '>
            <p className="p-2">© 2024 Dream Wedders, All rights reserved.</p>
          </footer>
        </div>
      </main>

    </section>
  );
};

export default LeftSideBar;
