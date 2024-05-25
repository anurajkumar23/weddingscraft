export default async function getPhotographer() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/photographer`,
        { cache: 'no-store' }
      );
      const data = await response.json();
  
      if (data.message === "success") {
        return data.data.photographer;
      } else {
        throw new Error("Failed to fetch photographer data");
      }
    } catch (error) {
      console.error("Error fetching photographer:", error);
      throw error;
    }
  }
  