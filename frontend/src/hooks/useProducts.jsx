import { useState } from "react";
import {
  ProductById,
  Products,
  bestSellingProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/services/productService";

export const useProducts = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleError = (error) => {
    const message = error.message || "Ocurrió un error inesperado";
    setError(message);
    console.error(message);
  };

  const fetchProducts = async (token) => {
    try {
      setLoading(true);
      setError(null);
      const response = await Products(token);

      if (response.success === false) {
        setError(response.message);
        setProducts([]);
        return [];
      }

      const productsArray = Array.isArray(response.data) ? response.data : [];
      setProducts(productsArray);
      return productsArray;
    } catch (error) {
      setError(error.message || "Error al cargar productos");
      setProducts([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id_product, token) => {
    try {
      setLoading(true);
      const response = await ProductById(id_product, token);
      if (!response.success) {
        setError(response.message);
      } else {
        setSelectedProduct(response.data[0]);
      }
      return response;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const getBestSellingProducts = async (token) => {
    try {
      setLoading(true);
      const response = await bestSellingProducts(token);
      if (!response.success) {
        setError(response.message);
      } else {
        setProducts(response.data);
      }
      return response;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const newProduct = async (token, productData) => {
    try {
      setLoading(true);
      const response = await createProduct(productData, token);
      if (!response.success) {
        setError(response.message);
      } else {
        setProducts((prev) => [...prev, response.data]);
      }
      return response;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateProducts = async (id_product, productData, token) => {
    try {
      setLoading(true);
      const response = await updateProduct(id_product, productData, token);
      if (!response.success) {
        setError(response.message);
      } else {
        setProducts((prev) =>
          prev.map((p) => (p.id === id_product ? response.data[0] : p))
        );
      }
      return response;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProducts = async (id_product, token) => {
    try {
      setLoading(true);
      const response = await deleteProduct(id_product, token);
      if (!response.success) {
        setError(response.message);
      } else {
        setProducts((prev) => prev.filter((p) => p.id !== id_product));
      }
      return response;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchProducts,
    getProductById,
    getBestSellingProducts,
    newProduct,
    updateProducts,
    deleteProducts,
    products,
    selectedProduct,
    error,
    loading,
  };
};
