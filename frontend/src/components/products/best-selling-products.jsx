import { useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";

const BestSellingProducts = ({ token }) => {
  const { bestProducts, getBestSellingProducts, loading, error } =
    useProducts();

  useEffect(() => {
    getBestSellingProducts(token);
  }, [token]);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="border border-gray-200 rounded-lg shadow-xs overflow-auto dark:border-neutral-700">
      <table className="min-w-full divide-y divide-gray-200 overflow-hidden whitespace-nowrap dark:divide-neutral-700">
        <thead className=" bg-gray-50 dark:bg-neutral-700">
          <tr>
            <th className="px-5 p-3 text-start text-xs font-medium text-gray-500 dark:text-neutral-300">
              Id
            </th>
            <th className="px-5 p-3 text-start text-xs font-medium text-gray-500 dark:text-neutral-300">
              Name
            </th>
            <th className="px-5 p-3 text-start text-xs font-medium text-gray-500  dark:text-neutral-300">
              Description
            </th>
            <th className="px-5 p-3 text-start text-xs font-medium text-gray-500 dark:text-neutral-300">
              Total Units Sold
            </th>
            <th className="px-5 p-3 text-start text-xs font-medium text-gray-500 dark:text-neutral-300">
              Stock
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-neutral-700">
          {bestProducts.map((pro) => (
            <tr
              key={pro.id_product}
              className=" hover:bg-gray-100  dark:hover:bg-neutral-800"
            >
              <td className="px-5 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                {pro.id_product}
              </td>
              <td className="px-5 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                {pro.product_name}
              </td>
              <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                {pro.product_description}
              </td>
              <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                {pro.total_sold}
              </td>
              <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                {pro.stock} <span className="text-muted-foreground">u</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BestSellingProducts;
