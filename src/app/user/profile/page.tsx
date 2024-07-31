"use client";
import { useAuth } from '@/app/authContext';
import checkAuthentication from '@/utils/auth/checkauthentication';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { UserRoundPen } from 'lucide-react';
import Link from 'next/link';

interface Options {
  year: 'numeric';
  month:'long';
  day:'numeric';

}

function formatDate(dateString:string) {
  const date = new Date(dateString);
  const options:Options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-GB', options );
}

export default function Page() {
  const { user, setUser } = useAuth();
  const router = useRouter()
  console.log("🚀 ~ Page ~ user:", user)
  let joined
  if(user){
    joined= formatDate(user.createdAt)
  }
  useEffect(() => {

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("jwt_token")
        console.log(token,"token")
      if(!token){
        router.push("/auth/login")
      }
        const data = await checkAuthentication();
        if (data) {
          setUser(data.message);
        }else{
          router.push("/auth/login")
        }
      } catch (error) {
        console.error('Error during authentication:', error);
      }
    };
    if (!user) {
      fetchUserData();
    }
  }, [user, setUser]);

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
          <p className='font-semibold text-lg'>{user && (user.name || "Not Provided")}</p>
          <p className='text-gray-600'>{user && (user.email || "Not Provided")}</p>
          <p className='text-gray-600'>Phone: {user && (user.phone || "Not Provided")}</p>
          <p className='text-gray-600'>Joined on: {user && joined}</p>
          <p className='text-gray-600'>Address: {user && (user.address || "Not Provided")}</p>
          <p className='text-gray-600'>Pincode: {user && (user.pincode || "Not Provided")}</p>
          <p className='text-gray-600'>City: {user && (user.city || "Not Provided")}</p>
          <p className='text-gray-600'>State: {user && (user.state || "Not Provided")}</p>
        </div>
     
    </div>
  </div>
  );
}
