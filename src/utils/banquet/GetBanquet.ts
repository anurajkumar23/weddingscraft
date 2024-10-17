import axios from "axios";


export default async function getBanquet( filters = {} ) {
  try {
    let token = "";

    // Check if we are on the client side
    if (typeof window !== "undefined") {
      token = localStorage.getItem("jwt_token") || "";
    }


    // Construct query string from filters
    const queryString = new URLSearchParams(filters as Record<string, string>).toString();

    // Use backend URL from environment variables
    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api";

    const response = await axios.get(`${API_URL}/banquet?${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data.message === "success") {
      return response.data.data; // Ensure this contains the expected array of banquet objects
    } else {
      throw new Error("Failed to fetch banquet data");
    }
  } catch (error) {
    console.error("Error fetching banquet:", error);
    throw error;
  }
}
