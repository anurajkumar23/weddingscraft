"use client";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { SignUpSchema } from "@/components/Auth/formvalidator";
import { useFormik } from "formik";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/authContext";
import { Loading } from "@/utils/loading";
import Image from "next/image";

interface Signup {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
  phone: string;
}

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const signup = async (userData: { name: string; password: string; email: string; phoneNumber: string }) => {
    let loadingToast;
    try {
      setLoading(true);
      loadingToast = toast.loading("Creating account...");
      console.log(userData, "userData");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signup`,
        userData,
        { withCredentials: true }
      );
      console.log("🚀 ~ signup ~ response:", response);

      const token = response.data.token;  
      document.cookie = `jwt=${token}; max-age=${60 * 60 * 24 * 7}; path=/`;

      localStorage.setItem("jwt_token", token);

      toast.dismiss(loadingToast);
      toast.success("Sign up successful!");

      return response.data;
    } catch (error) {
      console.error("Error signing up:", error);

      toast.dismiss(loadingToast);
      toast.error("Sign up failed. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    email: "",
    password: "",
    name: "",
    confirmpassword: "",
    phone: "",
  };

  const {
    errors,
    handleBlur,
    handleSubmit,
    values,
    handleChange,
    isValid,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: SignUpSchema,
    onSubmit: async (values: Signup) => {
      try {
        const data = await signup({
          name: values.name,
          password: values.password,
          email: values.email,
          phoneNumber: values.phone,
        });
        console.log(data,"data")
        if (data?.status === 'success') {
          console.log("Signup successful, redirecting to profile...");
          setUser(data.user);
          router.push("/user/profile");
        }
      } catch (error) {
        console.error("Signup failed:", error);
      }
    },
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="py-6 max-w-md w-full space-y-2 p-10 bg-white rounded-xl shadow-lg">
            <Image
              src="/elements/logo.png"
              alt="logo"
              width={200}
              height={70}
              priority={false}
              loading="lazy"
            />
            <div className="flex font-semibold items-center text-center mt-2 p-1 gap-2">
              <div className="font-bold text-lg">Have an account?</div>
              <Link href="/auth/login" className="text-[#3856ea] text-[18px] flex">
                Log in now
                <FaArrowLeft className="ml-2 mt-1" />
              </Link>
            </div>
            <button
              // onClick={loginwithGoogle}
              className="w-full flex items-center mt-2 rounded-[9px] bg-white border-2 border-black hover:bg-gray-50 py-2 px-4 font-medium text-[#000814] duration-300 transform hover:scale-105 focus:outline-none focus:ring focus:border-[#0F7A9D] relative"
            >

              Sign Up with Google
            </button>
            <p className="text-center">OR</p>
            <form onSubmit={handleSubmit} className="flex w-full flex-col">
              <label>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] ">
                  Name <sup className="text-[#EF476F]">*</sup>
                </p>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Name"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.name && touched.name && (
                  <p className="font-semibold text-[#b40e0e]">{errors.name}</p>
                )}
              </label>

              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] ">
                  Email Address <sup className="text-[#EF476F]">*</sup>
                </p>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your Email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.email && touched.email && (
                  <p className="font-semibold text-[#b40e0e]">{errors.email}</p>
                )}
              </label>

              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] ">
                  Phone Number <sup className="text-[#EF476F]">*</sup>
                </p>
                <input
                  type="phone"
                  id="phone"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Phone Number"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.phone && touched.phone && (
                  <p className="font-semibold text-[#b40e0e]">{errors.phone}</p>
                )}
              </label>

              <div className="flex gap-x-4 pb-4">
                <label className="relative w-full">
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] ">
                    Create Password <sup className="text-[#EF476F]">*</sup>
                  </p>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your Password"
                    className="block w-full border px-3 py-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 pr-10 sm:text-sm"
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[34px] z-[10] cursor-pointer"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={24} fill="#AFB2BF" />
                    ) : (
                      <AiOutlineEye size={24} fill="#AFB2BF" />
                    )}
                  </span>
                  {errors.password && touched.password && (
                    <p className="font-semibold text-[#b40e0e]">{errors.password}</p>
                  )}
                </label>

                <label className="relative w-full">
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] ">
                    Confirm Password <sup className="text-[#EF476F]">*</sup>
                  </p>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmpassword"
                    name="confirmpassword"
                    value={values.confirmpassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Confirm Your Password"
                    className="block w-full border px-3 py-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 pr-10 sm:text-sm"
                  />
                  <span
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-[34px] z-[10] cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible size={24} fill="#AFB2BF" />
                    ) : (
                      <AiOutlineEye size={24} fill="#AFB2BF" />
                    )}
                  </span>
                  {errors.confirmpassword && touched.confirmpassword && (
                    <p className="font-semibold text-[#b40e0e]">{errors.confirmpassword}</p>
                  )}
                </label>
              </div>

              <button
                type="submit"
                className="bg-[#3856ea] flex justify-center hover:bg-[#344bc8] text-white font-semibold py-2 px-6 rounded-[8px] mb-5"
                disabled={!isValid}
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
}

export default SignupForm;
