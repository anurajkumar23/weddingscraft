import React, { ReactNode, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from "../../app/authContext";

interface ProtectProps {
  children: ReactNode;
}

export const ShowLogin: React.FC<ProtectProps> = ({ children }) => {
  const { user, updateAuth } = useContext(AuthContext) || {};
  const router = useRouter();

  useEffect(() => {
    if (user) {
      updateAuth && updateAuth();
    } else {
      router.push('/auth/login');
    }
  }, [user, updateAuth, router]);

  if (!user) {
    return null; // Render nothing if not authenticated
  }

  return <>{children}</>;
};

export const ShowLogout: React.FC<ProtectProps> = ({ children }) => {
  const { user } = useContext(AuthContext) || {};

  if (user) {
    return null; // Render nothing if authenticated
  }

  return <>{children}</>;
};
