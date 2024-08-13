// contexts/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Define the shape of your context
interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
  updateAuth: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<any>(null);
  

  const checkToken = () => {
    const token = localStorage.getItem('jwt_token');
    return !!token;
  };

  const updateAuth = () => {
    setUser(checkToken());
  };

  useEffect(() => {
    updateAuth();
    window.addEventListener('storage', updateAuth); // Listen to storage events
    return () => window.removeEventListener('storage', updateAuth);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, updateAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
