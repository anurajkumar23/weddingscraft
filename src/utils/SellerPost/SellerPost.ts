import axios from "axios";
import { cookies } from "next/headers";

export default async function getSellerPost() {
    try {
        const token = cookies().get('jwt')?.value || "";

    // Use backend URL from environment variables
    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api";

    const response = await axios.get(`${API_URL}/user/sellerpost`, {
        headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json",
          },
    });

    if (response.data.status === "success") {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Failed to fetch SellerPost data");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error("Authentication failed. Please log in.");
    }
    console.error("Error fetching SellerPost:", error);
    throw error;
  }
}