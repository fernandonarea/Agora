import axios from "axios";

export const Products = async (token, page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `http://localhost:3200/api/products/getProducts`,
      {
        params: {
          page,
          limit,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Product fetch service error";
    console.error(message);
    throw error;
  }
};

export const ProductById = async (token, id_product) => {
  try {
    const response = await axios.get(
      `http://localhost:3200/api/products/getProductById/${id_product}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Product fetch by id service error";
    throw new Error(message);
  }
};

export const bestSellingProducts = async (token) => {
  try {
    const response = await axios.get(
      "http://localhost:3200/api/products/getBestSellingProducts",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Products fetch service error";
    throw new Error(message);
  }
};

export const getProductByName = async (productname, token) => {
  try {
    const response = await axios.get(
      "http://localhost:3200/api/products/getProductByName",
      {
        params: { productname },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Product fetch by name service error";
    throw new Error(message);
  }
};

export const createProduct = async (productData, token) => {
  try {
    const response = await axios.post(
      "http://localhost:3200/api/products/createProduct",
      productData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Product creation service error";
    throw new Error(message);
  }
};

export const updateProduct = async (id_product, productData, token) => {
  try {
    const response = await axios.put(
      `http://localhost:3200/api/products/updateProduct/${id_product}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Error en el servicio de productos";
    throw new Error(message);
  }
};

export const deleteProduct = async (id_product, token) => {
  try {
    const response = await axios.delete(
      `http://localhost:3200/api/products/deleteProduct/${id_product}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Error en el servicio de productos";
    throw new Error(message);
  }
};
