export default async function getPhotographerId(id: string) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/photographer/${id}`,
        { cache: 'no-store' }
      );
  
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
  
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
  