export default async function getDecorator() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/decor`,
        { cache: 'no-store' }
      );
      const data = await response.json();
  
      if (data.message === "success") {
        return data.data.decorator;
      } else {
        throw new Error("Failed to fetch Decorator data");
      }
    } catch (error) {
      console.error("Error fetching Decorator:", error);
      throw error;
    }
  }
  