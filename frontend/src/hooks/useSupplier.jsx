import {
  createSupplier,
  deleteSupplier,
  getSuppliers,
} from "@/services/supplierService";
import { useState } from "react";

const useSupplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleError = (error) => {
    setError(error.message || "Unexpected error occurred");
  };

  const Suppliers = async (token) => {
    try {
      setLoading(true);
      const response = await getSuppliers(token);
      setSuppliers(response.data);
      return response;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const CreateSupplier = async (supplierData, token) => {
    try {
      setLoading(true);
      const response = await createSupplier(supplierData, token);
      setSuppliers((prev) => [...prev, response.data]);
      setLoading(false);
      return response;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const DeleteSupplier = async (id_supplier, token) => {
    try {
      setLoading(true);
      await deleteSupplier(id_supplier, token);
      setSuppliers((prev) =>
        prev.filter((supplier) => supplier.id !== id_supplier)
      );
      setLoading(false);
      return true;
    } catch (error) {
      handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    Suppliers,
    CreateSupplier,
    DeleteSupplier,
    suppliers,
    loading,
    error,
  };
};

export default useSupplier;
