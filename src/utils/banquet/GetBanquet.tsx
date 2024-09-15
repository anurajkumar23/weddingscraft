export default async function getBanquet(filters = {}) {
  try {
    const queryString = new URLSearchParams(filters).toString();
    console.log(queryString,"query")
    const response = await fetch(
      `http://localhost:3000/api/banquet?${queryString}`,
      { cache: 'no-store' }
    );
    const data = await response.json();

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
