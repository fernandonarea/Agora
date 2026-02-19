import { createSale, Metrics, Performance, Statics } from "@/services/salesService";
import { useState } from "react";

export const useSale = () => {
  const [loading, setLoading] = useState(false);
  const [saleId, setSaleId] = useState(null);
  const [sale, setSale] = useState({});
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [statics, setStatics] = useState([])

  const handleError = (error) => {
    setError(error.message || "Unexpected error occurred");
  };

  const createNewSale = async (customer_name, items, token) => {
    try {
      setLoading(true);
      setError(null);
      const data = await createSale(customer_name, items, token);
      setSaleId(data.record_id?.id_sale);
      setSale(data.record_id);
      return data;
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

  const getStatics = async (token) => {
    try {
      const response = await Statics(token);
      setStatics(response.data)
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  return {
    createNewSale,
    getMetrics,
    getGraphicsData,
    getStatics,
    data,
    metrics,
    statics,
    sale,
    saleId,
    loading,
    error,
  };
};
