"use client";
import { useAuth } from '@/app/authContext';
import checkAuthentication from '@/utils/auth/checkauthentication';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import LeftSideBar from './LeftSideBar';
import UserLayout from './layout';
import Image from 'next/image';
import { UserRoundPen } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  const { user, setUser } = useAuth();
  const router = useRouter()
  console.log("🚀 ~ Page ~ user:", user)

  // useEffect(() => {

  //   const fetchUserData = async () => {
  //     try {
  //       const data = await checkAuthentication();
  //       console.log("🚀 ~ fetchUserData ~ data:", data)
  //       if (data) {
  //         setUser(data.message);
  //       }else{
  //         router.push("/auth/login")
  //       }
  //     } catch (error) {
  //       console.error('Error during authentication:', error);
  //     }
  //   };

  //   if (!user) {
  //     fetchUserData();
  //   }
  // }, [user, setUser]);

  return (

    <div className='p-4 w-full h-full'>
      
      <div className='border m-4 p-2 flex flex-col items-center relative'>
       <Link href="profile/editProfile"> 
        <button className='absolute top-4 right-4 bg-blue-400 text-white p-2 rounded flex items-center'>
          <UserRoundPen className='mr-2' /> Edit Profile
        </button>
       </Link>
        <p className='font-semibold text-xl mb-4'>Welcome, {user ? user.name : 'Guest'}! This is a protected page.</p>
        <div className='border overflow-hidden flex justify-center items-center rounded-full mb-4'>
        <Image
          src="https://source.unsplash.com/2ShvY8Lf6l0/800x599"
          alt="Profile Picture"
          width={500}
          height={500}
          className='object-cover w-48 h-48 hover:scale-105 transition-transform duration-300 cursor-pointer rounded-full'
          loading='lazy'
        />
      </div>
     
        <div className='text-center'>
          <p className='font-semibold text-lg'>Anuraj Kumar</p>
          <p className='text-gray-600'>anurajkumar6294@gmail.com</p>
          <p className='text-gray-600'>+916294806963</p>
          <p className='text-gray-600'>Joined on: 27 July 2024</p>
        </div>
     
    </div>
  </div>
  );
}
