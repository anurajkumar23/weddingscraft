"use client";

import { useEffect, useState } from "react";



const Provider = ({ children }: { children: any }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return ( 
    <>
     {children}
    </>
   );
}
 
export default Provider;
