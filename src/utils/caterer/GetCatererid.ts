import axios from 'axios';

export default async function getCatererId(id: string) {
  try {
    const { data } = await axios.get(`http://localhost:8000/api/caterer/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (data.message === "success") {
      return data.data;
    } else {
      throw new Error("Failed to fetch caterer data");
    }
  } catch (error) {
    console.error("Error fetching caterer:", error);
    throw error;
  }
}
