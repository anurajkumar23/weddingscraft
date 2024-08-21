import axios from "axios";

export async function currentUser(id:string){
    try{
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`
        );
        
        return response.data.data.user
    }catch (error) {
        console.error("Error fetching updated user ", error);
        
    }
}