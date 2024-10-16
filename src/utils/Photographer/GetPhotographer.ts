import axios from "axios";

interface PhotographerFilters {
  ids?: string; // Photographer IDs array
  [key: string]: any; // Other filters as key-value pairs
}

export default async function getPhotographer(photographerIds: string[] = [], filters: PhotographerFilters = {}) {
  try {
    let token = "";

    // If running on the client-side, get token from localStorage
    if (typeof window !== "undefined") {
      token = localStorage.getItem("jwt_token") || "";
    }

    // If photographer IDs are provided, convert them to a comma-separated string and add to filters
    if (photographerIds.length > 0) {
      filters.ids = photographerIds.join(",");
    }

    // Construct query string from filters
    const queryString = new URLSearchParams(filters as Record<string, string>).toString();

    // Use backend URL from environment variables
    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api";

    // Make the API request with token and content-type
    const response = await axios.get(`${API_URL}/photographer?${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data.message === "success") {
      return response.data.data; // Return the photographer data
    } else {
      throw new Error("Failed to fetch photographer data");
    }
  } catch (error) {
    console.error("Error fetching photographer:", error);
    throw error;
  }
}