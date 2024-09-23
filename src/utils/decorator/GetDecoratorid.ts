import axios from 'axios';

export default async function getBanquetId(id: string) {
  try {
    const { data } = await axios.get(`http://localhost:8000/api/decor/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (data.message === "success") {
      return data.data;
    } else {
      throw new Error("Failed to fetch decorator data");
    }
  } catch (error) {
    console.error("Error fetching decorator:", error);
    throw error;
  }
}
