  export default async function getDecoratorId(id: string) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/decor/${id}`,
        { cache: 'no-store' }
      );
  
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (data.message === "success") {
        return data.data.decorator;
      } else {
        throw new Error("Failed to fetch decorator data");
      }
    } catch (error) {
      console.error("Error fetching decorator:", error);
      throw error;
    }
  }
  