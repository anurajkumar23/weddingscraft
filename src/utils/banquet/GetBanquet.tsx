export default async function getBanquet() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/banquet`,
        { cache: 'no-store' }
      );
      const data = await response.json();
  
      if (data.message === "success") {
        return data.data.banquet;
      } else {
        throw new Error("Failed to fetch banquet data");
      }
    } catch (error) {
      console.error("Error fetching banquet:", error);
      throw error;
    }
  }
  