import axios from "axios";
import { cookies } from "next/headers";

export default async function getCaterer(filters = {}) {
  try {
    const token = cookies().get('jwt')?.value || "";
  
    const queryString = new URLSearchParams(filters).toString();

    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    // Make the API request with token and content-type
    const response= await axios.get(`${API_URL}/caterer?${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
    });

    

    if (response.data.message === "success") {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch caterer data");
    }
  } catch (error) {
    console.error("Error fetching caterer:", error);
    throw error;
  }
}