import axios from "axios";

export const getSuppliers = async(token) => {
    try {
        const response = await axios.get("http://localhost:3200/api/suppliers", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching suppliers:", error);
        throw error;
    }
}

export const createSupplier = async (supplierData, token) => {
    try{
        const response = await axios.post("http://localhost:3200/api/suppliers", supplierData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        return response.data;
    }catch(error){
        console.error("Error creating supplier:", error);
        throw error;
    }
}

export const deleteSupplier = async (id_supplier, token) => {
    try{
        const response = await axios.delete(`http://localhost:3200/api/suppliers/${id_supplier}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        return response.data;
    }catch(error){
        console.error("Error deleting supplier:", error);
        throw error;
    }
}