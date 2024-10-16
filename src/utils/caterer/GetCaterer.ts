import axios from "axios";

interface CatererFilters {
  ids?: string; // Caterer IDs array
  [key: string]: any; // Other filters as key-value pairs
}

export default async function getCaterer(catererIds: string[] = [], filters: CatererFilters = {}) {
  try {
    let token = "";

    // If running on the client-side, get token from localStorage
    if (typeof window !== "undefined") {
      token = localStorage.getItem("jwt_token") || "";
    }

    // If caterer IDs are provided, convert them to a comma-separated string and add to filters
    if (catererIds.length > 0) {
      filters.ids = catererIds.join(","); 
    }

    // Construct query string from filters
    const queryString = new URLSearchParams(filters as Record<string, string>).toString();

    // Use backend URL from environment variables
    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api";

    // Make the API request with token and content-type
    const response = await axios.get(`${API_URL}/caterer?${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data.message === "success") {
      return response.data.data; // Return the caterer data
    } else {
      throw new Error("Failed to fetch caterer data");
    }
  } catch (error) {
    console.error("Error fetching caterer:", error);
    throw error;
  }
}
