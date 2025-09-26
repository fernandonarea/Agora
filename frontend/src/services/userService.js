import axios from "axios";

export const getUserById = async (id_user, token) => {
    try {
        const response = axios.get(`http://localhost:3200/api/users/getUserById/${id_user}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        } )
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Error en login";
        throw new Error(message);
    }
}