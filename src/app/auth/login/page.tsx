"use client"
import React, { useRef, useState } from 'react'
import { LogInSchema } from '@/components/Auth/formvalidator';
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { Loading } from '@/utils/loading';
import { useFormik } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation"; 
import { useAuth } from '@/app/authContext';



interface login {
    email: string;
    password: string;
  }

  const initialValues = { email: "", password: "" };


export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading,setLoading] = useState<boolean>(false);
    const isSubmitClicked = useRef(false)
    const router = useRouter();
    const { user,setUser} =   useAuth();
    
    
    const {
      errors,
      handleBlur,
      handleSubmit,
      values,
      isValid,
      handleChange,
      touched,
    } = useFormik({
      initialValues,
      validationSchema: LogInSchema,
      onSubmit: async (values: { email: string; password: string; }) => {
      
      //   isSubmitClicked.current = true
        try {
          setLoading(true)
          const data = await login({
            email: values.email,
            password: values.password,
          });
          console.log(data.success,"user")

         if(data.success===true){
          console.log("entered")
          setUser(data.user)
          router.push("/user/profile"); 
         }
        } catch (error) {
          console.error("Login error:", error);
        }
        finally{
          setLoading(false)
        }
      },
    });

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const login = async (userData: login) => {
      console.log(userData)
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/login`,
          userData,
          //{ withCredentials: true }
        );
        console.log(response)
        const token = response.data.token;
        document.cookie = `jwt=${token}; max-age=${60 * 60 * 24 * 7}; path=/`;
  
        localStorage.setItem("jwt_token", token);
  
        if (response.status === 200) {
          return response.data;
        }
      } catch (error) {
        console.error("Error logging in:", error);
        toast.error("Login failed. Please check your credentials.");
        throw error;
      }
    };
    
    return (
        <>
        {
          loading ? <>
          <Loading/>
          </> 
          :<>
                <div className="flex items-center justify-center min-h-screen bg-black">
            <div className=" w-[500px] custom-shadow">
           <p className='text-white'>Add Dream wedding image here.....</p>
              <form
                onSubmit={handleSubmit}
                className="mt-6 flex w-full flex-col gap-y-4"
              >
                <label className="w-full">
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-200 z-[50]">
                    Email please <sup className="text-[#EF476F]">*</sup>
                  </p>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    autoComplete="on"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full rounded-[0.5rem] p-[12px] bg-[#E6E6E6]"
                  />
                  {errors.email && touched.email && (
                    <p className="text-[#b40e0e] font-semibold ">{errors.email}</p>
                  )}
                </label>
    
                <label className="relative">
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-200">
                    Password <sup className="text-[#EF476F]">*</sup>
                  </p>
                  <input
                    type={showPassword ? "text" : "password"} // Toggle input type
                    name="password"
                    id="password"
                    autoComplete="off"
                    placeholder="Your Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full rounded-[0.5rem] bg-[#E6E6E6] p-[12px] pr-12"
                  />
                  {errors.password && touched.password && (
                    <p className="text-[#b40e0e] font-semibold">
                      {errors.password}
                    </p>
                  )}
                  <br />
                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                  </span>
                </label>
                <button
                  type="submit"
                  className="mt-6 rounded-[8px] bg-[#5bc2eb] py-[9px] px-[12px] font-medium text-[#000814] duration-500"
                  disabled={!isValid}
                >
                  Login
                </button>
              </form>
              <div className="toast-wrapper">
              {/* <Toaster position="top-center" reverseOrder={false} /> */}
    
              </div>
            </div>
          </div>
          </>
        }
        <Toaster position="top-center" reverseOrder={false} />
        </>
      );
}
