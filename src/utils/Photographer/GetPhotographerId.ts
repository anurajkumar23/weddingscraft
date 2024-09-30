import axios from 'axios';

export default async function getPhotographerId(id: string | null) {
  if (!id) {
    return null;
  }
  try {
    const { data } = await axios.get(`http://localhost:8000/api/photographer/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (data.message === "success") {
      return data.data;
    } else {
      throw new Error("Failed to fetch photographer data");
    }
  } catch (error) {
    console.error("Error fetching photographer:", error);
    throw error;
  }
}
