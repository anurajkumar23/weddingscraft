export default async function getCaterer() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/caterer`,
        { cache: 'no-store' }
      );
      const data = await response.json();
  
      if (data.message === "success") {
        return data.data.caterer;
      } else {
        throw new Error("Failed to fetch caterer data");
      }
    } catch (error) {
      console.error("Error fetching caterer:", error);
      throw error;
    }
  }
  