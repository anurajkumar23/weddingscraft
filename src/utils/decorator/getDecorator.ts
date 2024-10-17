import axios from "axios";


export default async function getDecorator( filters = {}) {
  try {
    let token = "";

    // If running on the client-side, get token from localStorage
    if (typeof window !== "undefined") {
      token = localStorage.getItem("jwt_token") || "";
    }

    // Construct query string from filters
    const queryString = new URLSearchParams(filters as Record<string, string>).toString();

    // Use backend URL from environment variables
    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api";

    // Make the API request with token and content-type
    const response = await axios.get(`${API_URL}/decor?${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data.message === "success") {
      return response.data.data; // Return the decorator data
    } else {
      throw new Error("Failed to fetch decorator data");
    }
  } catch (error) {
    console.error("Error fetching decorator:", error);
    throw error;
  }
}