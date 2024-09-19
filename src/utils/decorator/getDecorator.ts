export default async function getDecorator(filters = {}) {
    try {
      const queryString = new URLSearchParams(filters).toString();
      const response = await fetch(
        `http://localhost:3000/api/decor?${queryString}`,
        { cache: 'no-store' }
      );
      const data = await response.json();
  
      if (data.message === "success") {
        return data.data;
      } else {
        throw new Error("Failed to fetch Decorator data");
      }
    } catch (error) {
      console.error("Error fetching Decorator:", error);
      throw error;
    }
  }
  