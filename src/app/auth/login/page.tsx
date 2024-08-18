"use client";
import React, { useRef, useState, useEffect } from "react";
import { LogInSchema } from "@/components/Auth/formvalidator";
import {  toast } from 'react-toastify';
import axios from "axios";
import { Loading } from "@/utils/loading";
import { useFormik } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/authContext";
import Image from "next/image";
import Link from "next/link";

interface login {
  email: string;
  password: string;
}

const initialValues = { email: "", password: "" };

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const isSubmitClicked = useRef(false);
  const router = useRouter();
  const { user, setUser } = useAuth();

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
    onSubmit: async (values: { email: string; password: string }) => {
      try {
        setLoading(true);
        const data = await login({
          email: values.email,
          password: values.password,
        });
        console.log(data.success, "user");

        if (data.success === true) {
          console.log("entered");
          setUser(data.user);
          localStorage.setItem("user_id",data.user._id)
          toast.success("Login successful!");
          router.push("/user/profile");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Login failed. Please check your credentials.");
      } finally {
        setLoading(false);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const login = async (userData: login) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/login`,
        userData
      );
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

  // Ensure the router is a dependency for useEffect
  
  useEffect(() => {
    const fetchUserData = async () => {
      const id = localStorage.getItem("user_id");
      if (id) {
        if (user) {
          router.push("/user/profile");
        } else {
          try {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`
            );
            // Handle the response data as needed
            console.log(response.data);
            setUser(response.data.user);
            router.push("/user/profile");
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      }
    };

    fetchUserData();
  }, [user, router]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-sm w-full space-y-6 p-10 bg-white rounded-xl shadow-lg">
            <Image
              src="/elements/logo.png"
              alt="logo"
              width={200}
              height={70}
              priority={false}
              loading="lazy"
            />
            <div className="gap-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Sign in</h1>
              <p className="text-gray-500">to continue to Dream Wedding</p>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-900 z-[50]">
                  Email please <sup className="text-red-500">*</sup>
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
                  className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                {errors.email && touched.email && (
                  <p className="text-[#b40e0e] font-semibold ">
                    {errors.email}
                  </p>
                )}
              </label>

              <label className="relative">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-900">
                  Password <sup className="text-red-500">*</sup>
                </p>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  autoComplete="off"
                  placeholder="Your Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border px-3 py-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-[12px] pr-10 sm:text-sm"
                />
                {errors.password && touched.password && (
                  <p className="text-[#b40e0e] font-semibold">
                    {errors.password}
                  </p>
                )}
                <br />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute ml-[270px] top-[34px] z-[10] cursor-pointer"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye size={24} fill="#AFB2BF" />
                  )}
                </span>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember_me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>
              </label>

              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={!isValid}
              >
                Sign in
              </button>
            </form>
            <div className="text-sm flex gap-x-2">
              <p className="text-gray-500">No account?</p>
              <Link
                href="/auth/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}