"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import Link from 'next/link';
import logo from "../../public/Dream_Wedding_Logo.png"
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { navLinks } from '@/lib/constants';
import { NavLink } from '@/lib/types';

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
            <Link href="/auth/login">
              <li className='border p-2 rounded-sm text-blue-500 bg-blue-100'>
                Login /SignUp
              </li>
            </Link>
            {/* <Link href='/user/profile'> */}
            <li>
              <Avatar onClick={handleNav}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </li>
            {/* </Link> */}
          </ul>
        </div>
      </div>
      {/* <div className='font-semibold bottom-0 w-full h-20 shadow-xl bg-slate-100  fixed md:hidden' style={{ boxShadow: '0px -4px 6px rgba(0, 0, 0, 0.1)' }}>
        <ul className='flex justify-between items-center h-full text-sm px-3'>
          <li>
          <Link href="/">
          <RiHome3Line className="text-2xl w-full items-center"/>
          Home</Link></li>
          <li>Banquet Halls</li>
          <li>Caterer</li>
          <li>Decorators</li>
          <li>Photographers</li>
        </ul>
      </div> */}
      <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 backdrop-blur-sm bg-opacity-75 z-50 ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={handleNav}>
        <div className={`fixed right-0 top-0 w-[365px] h-full bg-slate-50  ease-in duration-500 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={(e) => e.stopPropagation()}>
          <div className='p-4 flex cursor-pointer items-center justify-start mb-4'>
            <AiOutlineClose size={25} onClick={handleNav} />
          </div>
          <div className=" flex flex-col items-center text-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AN</AvatarFallback>
            </Avatar>
            <p className="mt-4 font-semibold text-lg">Anuraj</p>
            <p className="text-blue-500 cursor-pointer">Click to view profile</p>
          </div>
          <hr className="w-full border-t border-gray-300" />
          <ul className="p-2 pb-36 overflow-y-auto h-full hide-scrollbar text-black font-medium">
            {navLinks.map((link, index) => (
              <div key={link.label}>
                <Link href={link.url}
                  // variant="outline"
                  className="p-4 flex w-full justify-start space-x-2  hover:bg-gray-200 hover:rounded-md"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
                {index === 3 ||  index === 5 || index === 6 || index === 9 ? (
                  <div className='mt-4 pb-4'>
                    <hr className="w-full border-t border-gray-300" />
                  </div>
                ) : null}
              </div>
            ))}
          </ul>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
