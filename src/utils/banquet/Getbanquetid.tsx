import axios from 'axios';

export async function getBanquetid(id:string) {
    try {
        const response = await axios.get(`http://localhost:3000/api/banquet/${id}`);


        console.log(response.data,"dataishu")
       
        return response.data;
    } catch (error) {
        console.error('Error fetching banquet:', error);
        throw error; 
    }
}
