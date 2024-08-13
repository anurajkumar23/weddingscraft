"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import Link from 'next/link';
import logo from "../../public/Dream_Wedding_Logo.png"
import { useState } from 'react';
import { ShowLogin, ShowLogout } from '@/utils/protect/protect';
import SideNavbar from './SideNavbar';


const Navbar: React.FC = () => {

  const [menuOpen, setMenuOpen] = useState(false)


  const handleNav = () => {
    setMenuOpen(!menuOpen)
  }

 

  return (
    <nav className=" z-50 w-full h-20 shadow-xl bg-slate-100 ">
      <div className="flex justify-between gap-4 items-center h-full font-semibold w-full px-2 2xl:px-14 xl:px-10">
        <div className='cursor-pointer flex '>
          <Link href='/'>
            <Image
              width={500}
              height={500}
              src={logo}
              alt='Dream Wedding logo'
              className='w-80 cursor-pointer '
              priority={false}
              loading='lazy'

            />
          </Link>
        </div>
        <div>
          <ul className="flex gap-6 items-center cursor-pointer ">
            <li className='hidden md:flex'>
              <Link href="/">Home</Link></li>
            <li className='hidden md:flex'>
              <Link href="/BanquetHall">Banquet Halls</Link>
            </li>
            <Link href="/Caterers">
              <li className='hidden md:flex'>Caterer</li>
            </Link>
            <Link href="/Decorators">
              <li className='hidden md:flex'>Decorators</li>
            </Link>
            <li className='hidden md:flex'>
              <Link href="/Photographers">Photographers</Link>
            </li>
            <ShowLogout>
            <Link href="/auth/login">
              <li className='border p-2 rounded-sm text-blue-500 bg-blue-100'>
                Login /SignUp
              </li>
            </Link>
            </ShowLogout>
            <ShowLogin>
            <li>
             
              <Avatar onClick={handleNav}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              
            </li>
            </ShowLogin>

          </ul>
        </div>
      </div>
      <SideNavbar menuOpen={menuOpen} handleNav={handleNav}  />
    </nav>
  );
};

export default Navbar;
