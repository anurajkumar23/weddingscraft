import axios from "axios";

interface BanquetFilters {
  ids?: string;
  [key: string]: any; // Allow additional filter properties of any type
}

export default async function getBanquet(banquetIds: string[] = [], filters: BanquetFilters = {}) {
  try {
    let token = "";

    // Check if we are on the client side
    if (typeof window !== "undefined") {
      token = localStorage.getItem("jwt_token") || "";
    }

    // Add the banquet IDs to the filters if they exist
    if (banquetIds.length > 0) {
      filters.ids = banquetIds.join(","); // Convert array to comma-separated string
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
