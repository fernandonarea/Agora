import { createSale } from "@/services/salesService";
import { useState } from "react";


export const useSale = () => {
  const [loading, setLoading] = useState(false);
  const [saleId, setSaleId] = useState(null);
  const [error, setError] = useState(null);

  const handleError = (error) => {
    setError(error.message || "Error desconocido");
  };

  const createNewSale = async (customerName, items, token) => {
    try {
      setLoading(true);
      setError(null);
      const response = await createSale(customerName, items, token);
      setSaleId(response);
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
    saleId,
    loading,
    error,
  };
};
