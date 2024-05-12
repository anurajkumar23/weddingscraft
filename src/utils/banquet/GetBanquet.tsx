import axios from 'axios';

export async function getBanquet() {
    try {
        const response = await axios.get(`http://localhost:3001/api/banquet`);
       
        return response.data;
    } catch (error) {
        console.error('Error fetching banquet:', error);
        throw error; 
    }
}
