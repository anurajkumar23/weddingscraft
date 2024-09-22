import axios from 'axios';

export default async function checkAuthentication() {
  try {
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      return false;
    }

    const response = await axios.get(`http://localhost:8000/api/user/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response, "response");

    return response.data.user; 
  } catch (error) {
    console.error("Error fetching authentication data:", error);
    throw error;
  }
}
