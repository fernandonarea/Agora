import { createSale, Metrics, Performance } from "@/services/salesService";
import { useState } from "react";

export const useSale = () => {
  const [loading, setLoading] = useState(false);
  const [saleId, setSaleId] = useState(null);
  const [sale, setSale] = useState({});
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [metrics, setMetrics] = useState([]);

  const handleError = (error) => {
    setError(error.message || "Unexpected error occurred");
  };

  const createNewSale = async (customer_name, items, token) => {
    try {
      setLoading(true);
      setError(null);
      const response = await createSale(customer_name, items, token);
      setSaleId(response);
      setSale(response.data);
      return response;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getMetrics = async (token) => {
    try {
      setLoading(true);
      const response = await Metrics(token);
      setMetrics(response.data);
      return response;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getGraphicsData = async (token) => {
    try {
      setLoading(true);
      const response = await Performance(token);
      setData(response.data);
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
    getMetrics,
    getGraphicsData,
    data,
    metrics,
    sale,
    saleId,
    loading,
    error,
  };
};
