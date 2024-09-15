"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import Link from 'next/link';
import logo from "../../public/Dream_Wedding_Logo.png"
import { useState } from 'react';
// import { ShowLogin, ShowLogout } from '@/utils/protect/protect';
import SideNavbar from './SideNavbar';
import { useAuth } from '@/app/authContext';
import { useRouter } from "next/navigation"; 



const Navbar: React.FC = () => {

  const [menuOpen, setMenuOpen] = useState(false)
  const {user,setUser} = useAuth()
  // console.log(user,"navbar")
  const router = useRouter()


  const handleNav = () => {
    setMenuOpen(!menuOpen)
  }

  function handlelogout(){
    localStorage.clear()
    setUser(null)
    router.push("/")
  
  }

  return (
    <nav className="text-black z-50 w-full h-20 shadow-xl bg-slate-100 ">
      <div className="flex justify-between gap-4 items-center h-full font-semibold w-full px-2 2xl:px-14 xl:px-10">
        <div className='cursor-pointer flex '>
          <Link href='/'>
          <Image
              src="/elements/logo.png"
              alt="logo"
              width={260}
              height={70}
              priority={false}
              loading="lazy"
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
            <Link href="/Caterer">
              <li className='hidden md:flex'>Caterer</li>
            </Link>
            <Link href="/Decorator">
              <li className='hidden md:flex'>Decorators</li>
            </Link>
            <li className='hidden md:flex'>
              <Link href="/Photographer">Photographers</Link>
            </li>
            <Link href="/seller">
              <li className='hidden md:flex'>Seller</li>
            </Link>
            {/* <ShowLogout> */}
            {!user ? ( <Link href="/auth/login">
              <li className='border p-2 rounded-sm text-blue-500 bg-blue-100'>
                Login /SignUp
              </li>
            </Link>):( <><div className='' onClick={handlelogout}>
              <li className='border p-2 rounded-sm text-blue-500 bg-blue-100'>
                Logout
              </li>
              
           
            </div> <li>
             
             <Avatar onClick={handleNav}>
               <AvatarImage src="https://github.com/shadcn.png" />
               <AvatarFallback>CN</AvatarFallback>
             </Avatar>
             
           </li></>)}
           
           
            {/* </ShowLogout>
            <ShowLogin> */}
       
            {/* </ShowLogin> */}

          </ul>
        </div>
      </div>
      <SideNavbar menuOpen={menuOpen} handleNav={handleNav}  />
    </nav>
  );
};

export default Navbar;
