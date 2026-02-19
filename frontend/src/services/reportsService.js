import axios from "axios";

export const generateSalesInvoice = async (id_sales, token) => {
  try {
    const response = await axios.get(`http://localhost:3200/sales/${id_sales}/pdf`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        responseType: "blob"
    });
    return response.data
  } catch (error) {
    throw new Error(`Error al generar el pdf: ${error}`);
  }
};
