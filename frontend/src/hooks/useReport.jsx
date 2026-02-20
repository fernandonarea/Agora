import { useState } from "react";
import { generateSalesInvoice, allProductsReportService } from "../services/reportsService";

export const useReport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateInvoice = async (id_sales, token) => {
    setLoading(true);
    try {
      const blob = await generateSalesInvoice(id_sales, token);

      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `factura_${id_sales}.pdf`);

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const allProductsReport = async (token) => {
    setLoading(true);
    const day = new Date()
    try {
      const blob = await allProductsReportService(token);

      const url = window.URL.createObjectURL(new Blob([blob]))
      const link = document.createElement("a")
      link.href = url;
      link.setAttribute("download", `inventario_${day.toISOString()}.pdf`)

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      setError(error.message)
    }  finally{
      setLoading(false)
    }
  }
  return { generateInvoice, allProductsReport, loading, error };
};

