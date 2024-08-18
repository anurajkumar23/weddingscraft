// import React, { ReactNode, useContext, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { AuthContext } from "../../app/authContext";

// interface ProtectProps {
//   children: ReactNode;
// }

// export const ShowLogin: React.FC<ProtectProps> = ({ children }) => {
//   const { user } = useContext(AuthContext) || {};

//   if (!user) {
//     return null; // Render nothing if not authenticated
//   }

//   return <>{children}</>;
// };

// export const ShowLogout: React.FC<ProtectProps> = ({ children }) => {
//   const { user } = useContext(AuthContext) || {};

//   if (user) {
//     return null; // Render nothing if authenticated
//   }

//   return <>{children}</>;
// };


// export const IsAdminOrSeller: React.FC<ProtectProps> =({children}) =>{
//   const { user } = useContext(AuthContext) || {}

//   if(user?.role !== 'admin' && user?.role !== 'seller'){
//    return null;
//   }
//   return <>{children}</>
// }