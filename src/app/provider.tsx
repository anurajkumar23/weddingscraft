"use client";

import { AuthProvider } from "./authContext";



const Provider = ({ children }: { children: any }) => {

  return ( 
    <AuthProvider>
     {children}
    </AuthProvider>
   );
}
 
export default Provider;
