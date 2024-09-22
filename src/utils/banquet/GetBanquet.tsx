import axios from "axios";
import { cookies } from "next/headers";

export default async function getBanquet(filters = {}) {
  try {
    const token = cookies().get('jwt')?.value || "";
  
    const queryString = new URLSearchParams(filters).toString();

    // Make the API request with token and content-type
    const response= await axios.get(`http://localhost:8000/api/banquet?${queryString}`, {
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
