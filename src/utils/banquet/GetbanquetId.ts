import axios from 'axios';

export default async function getBanquetId(id: string) {
  if (!id) {
    // Return null if no ID is provided
    return null;
  }

  try {
    const { data } = await axios.get(`http://localhost:8000/api/banquet/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (data.message === "success") {
      return data.data;
    } else {
      throw new Error("Failed to fetch banquet data");
    }
  } catch (error) {
    console.error("Error fetching banquet:", error);
    throw error;
  }
}
