import axios from "axios";
import { cookies } from "next/headers";

export default async function getBanquet(filters = {}) {
  try {
    const token = cookies().get('jwt')?.value || "";
  
    const queryString = new URLSearchParams(filters).toString();


    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  
    const response = await axios.get(`${API_URL}/banquet?${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
      
    });

    if (response.data.message === "success") {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch banquet data");
    }
  } catch (error) {
    console.error("Error fetching banquet:", error);
    throw error;
  }
}