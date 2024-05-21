export default async function getBanquetId(id: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/banquet/${id}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

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
