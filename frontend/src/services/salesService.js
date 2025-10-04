import axios from "axios";

export const createSale = async (customer_name, items, token) => {
  try {
    const response = await axios.post(
      `http://localhost:3200/api/sales/createSale`,
      {
        customer_name,
        items,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Error en el servicio de ventas";
    throw new Error(message);
  }
};

export const getSales = async (token) => {
  try {
    const response = await axios.get("localhost:3200/api/sales", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Error en el servicio de ventas";
    throw new Error(message);
  }
};
