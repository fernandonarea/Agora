import { createSale } from "@/services/salesService";
import { useState } from "react";


export const useSale = () => {
  const [loading, setLoading] = useState(false);
  const [saleId, setSaleId] = useState(null);
  const [sale, setSale] = useState({})
  const [error, setError] = useState(null);

  const handleError = (error) => {
    setError(error.message || "Error desconocido");
  };

  const createNewSale = async (customer_name, items, token) => {
    try {
      setLoading(true);
      setError(null);
      const response = await createSale(customer_name, items, token);
      setSaleId(response);
      setSale(response.data)
      return response;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    createNewSale,
    sale,
    saleId,
    loading,
    error,
  };
};
