"use client";
import { useAuth } from "@/app/authContext";
import checkAuthentication from "@/utils/auth/checkauthentication";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UserRoundPen } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
// import Loading from './loading';

interface Options {
  year: "numeric";
  month: "long";
  day: "numeric";
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-GB", options);
}

export default function Page() {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("jwt_token");
        if (!token) {
          router.push("/auth/login");
          return;
        }

        const data = await checkAuthentication();
        if (data) {
          setUser(data);
        } else {
          router.push("/auth/login");
        }
      } catch (error) {
        console.error("Error during authentication:", error);
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [user, setUser, router]); 

  const joined = user ? formatDate(user.createdAt) : "";

  console.log(user, "User form user page");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handlePhotoUpload = async () => {
    if (!selectedFile) return;
    const content = "image/jpeg";
    try {
      const token = localStorage.getItem("jwt_token");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/uploadPhoto`,
        { id: user._id, content },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // const data = response.data;
        const presignedPUTURL = response.data.data.presignedPUTURL;
        console.log("Photo uploaded successfully:", presignedPUTURL);
        console.log(selectedFile, "selectedfile");
        const filename = response.data.data.filename;
        const blob = new Blob([selectedFile]);
        console.log("Photo uploaded successfully:", blob);
        await fetch(presignedPUTURL, {
          method: "PUT",
          headers: {
            "Content-Type": content,
          },
          body: blob,
        });
        // Optionally, update the user with the new photo URL
        // setUser((prev: any) => ({ ...prev, photo: data.photoUrl }));
      } else {
        console.error("Error uploading photo:", response.statusText);
      }
      const updateUser = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/image/${user._id}`,
        { image: response.data.data.filename },
        {
          headers: {
            Authorization: token,

            "Content-Type": "application/json",
          },
        }
      );
      console.log(updateUser.data.data.user);
      setUser(updateUser.data.data.user);
    } catch (error) {
      console.error("Error during photo upload:", error);
    }
  };

  return (
    <div className="p-4 w-full h-full">
      <div className="border m-4 p-2 flex flex-col items-center relative">
        <Link href="/user/profile/editProfile">
          <button className="absolute top-4 right-4 bg-blue-400 text-white p-2 rounded flex items-center">
            <UserRoundPen className="mr-2" /> Edit Profile
          </button>
        </Link>
        <p className="font-semibold text-xl mb-4">
          Welcome, {user ? user.name : "Guest"}! This is a protected page.
        </p>
        <div className="border overflow-hidden flex justify-center items-center rounded-full mb-4">
          <Image
            src={
              user
                ? user.image
                : "https://source.unsplash.com/2ShvY8Lf6l0/800x599"
            }
            alt="Profile Picture"
            width={500}
            height={500}
            className="object-cover w-48 h-48 hover:scale-105 transition-transform duration-300 cursor-pointer rounded-full"
            loading="lazy"
          />
          {user?.sellerRequest === "accepted" && (
            <div className="absolute bottom-2 right-2 flex items-center bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
              <FaCheckCircle className="mr-1" /> Verified Seller
            </div>
          )}
        </div>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button
          className="bg-red-500 mt-2 p-2 rounded text-white"
          onClick={handlePhotoUpload}
        >
          Change Photo
        </button>
        <div className="text-center">
          <p className="font-semibold text-lg">
            {user?.name || "Not Provided"}
          </p>
          <p className="text-gray-600">{user?.email || "Not Provided"}</p>
          <p className="text-gray-600">
            Phone: {user?.phoneNumber || "Not Provided"}
          </p>
          <p className="text-gray-600">Joined on: {joined}</p>
        </div>
      </div>
    </div>
  );
}
