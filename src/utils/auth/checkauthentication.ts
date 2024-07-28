export default async function checkAuthentication() {
    try {
      const token = localStorage.getItem("jwt_token");
      if (!token) {
          throw new Error("No token found");
        }
        console.log("🚀 ~ checkAuthentication ~ token:", token)
  
      const response = await fetch(`http://localhost:3000/api/auth/authenticate`, {
        headers: {
          authorization: `Bearer ${token}`,
        }
      });

      console.log(response,"response")
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data, "from");
      return data; // Return the data if needed
    } catch (error) {
      console.error("Error fetching authentication data:", error);
      throw error;
    }
  }
  