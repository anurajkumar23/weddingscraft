export default async function getPhotographer(filters = {}) {
    try {
      const queryString = new URLSearchParams(filters).toString();
      console.log(queryString,"query")
      const response = await fetch(
        `http://localhost:3000/api/photographer?${queryString}`,
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
  