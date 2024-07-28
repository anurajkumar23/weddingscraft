"use client";

import { useEffect, useState } from "react";
import { AuthProvider } from "./authContext";



const Provider = ({ children }: { children: any }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return ( 
    <AuthProvider>
     {children}
    </AuthProvider>
   );
}
 
export default Provider;
