"use client";
import { useAuth } from '@/app/authContext';
import checkAuthentication from '@/utils/auth/checkauthentication';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import LeftSideBar from './LeftSideBar';
import UserLayout from './layout';

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

    <div>
        <p>Welcome, {user ? user.name : 'Guest'}! This is a protected page.</p>
    </div>
  );
}
