"use client";
import { useAuth } from '@/app/authContext';
import checkAuthentication from '@/utils/auth/checkauthentication';
import React, { useEffect } from 'react';

export default function Page() {
  const { user, setUser } = useAuth();
  console.log("🚀 ~ Page ~ user:", user)

  useEffect(() => {
   
    const fetchUserData = async () => {
      try {
        const data = await checkAuthentication();
        console.log("🚀 ~ fetchUserData ~ data:", data)
        if (data) {
          setUser(data.message);
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
    <div>
      Welcome, {user ? user.name : 'Guest'}! This is a protected page.
    </div>
  );
}
