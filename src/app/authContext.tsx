"use client"
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// Define the shape of your context
interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const id = localStorage.getItem("user_id");
      if (!id) return; // Early return if no user_id

      if (!user) {
        console.log("entered the use useeffect")
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`
          );
          // console.log(response.data.data.user,"usedata from context")
          setUser(response.data.data.user);
 
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [user, router]); // Dependency array includes user and router

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  // console.log("context",context)

  return context;
};
