import { useProducts } from "@/hooks/useProducts";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import { DeleteProduct } from "./crud/delete-product";
import { Input } from "../ui/input";

const ProductList = ({ token, onRefresh }) => {
  const { products, loading, error, fetchProducts, metadata } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (token) {
      fetchProducts(token, currentPage, limit);
    }
  }, [token, currentPage]);

  // Manejo de Paginación
  const handlePrevPage = () => {
    if (metadata.hasPrevPage) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (metadata.hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  //Capturar lo que el usuario ingresa en el input
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  //Busqueda de productos con metodo filter
  const filterProducts = !search
    ? products
    : products.filter(
        (product) =>
          product.product_name
            .toLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          product.product_price.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <div className="flex flex-col gap-5 w-full p-4">
      <Input
        value={search}
        onChange={handleSearch}
        placeholder="Buscar producto por nombre"
      />
      {products.length === 0 ? (
        <p>No hay Productos</p>
      ) : (
        <div className="border border-gray-200 rounded-lg shadow-xs overflow-hidden dark:border-neutral-700">
          <table className="min-w-full divide-y divide-gray-200 overflow-hidden whitespace-nowrap dark:divide-neutral-700">
            <thead className=" bg-gray-50 dark:bg-neutral-700">
              <tr>
                <th className="px-5 py-5 text-start text-xs font-medium text-gray-500 dark:text-neutral-300">
                  Nombre
                </th>
                <th className="px-5 py-5 text-start text-xs font-medium text-gray-500  dark:text-neutral-300">
                  Descripcion
                </th>
                <th className="px-5 py-5 text-start text-xs font-medium text-gray-500 dark:text-neutral-300">
                  Precio
                </th>
                <th className="px-5 py-5 text-start text-xs font-medium text-gray-500 dark:text-neutral-300">
                  Stock
                </th>
                <th className="px-5 py-5 text-start text-xs font-medium text-gray-500 dark:text-neutral-300">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-neutral-700">
              {filterProducts.map((p) => (
                <tr
                  key={p.id_product}
                  className=" hover:bg-gray-100  dark:hover:bg-neutral-800"
                >
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {p.product_name}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                    {p.product_description}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                    ${p.product_price}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                    {p.stock} <span className="text-muted-foreground">u</span>
                  </td>
                  <td className="flex gap-3 px-6 py-3 text-sm font-medium">
                    <Button
                      variant="outline"
                      className="hover:bg-violet-500 hover:text-white dark:hover:bg-violet-700"
                    >
                      <Pencil size={16} />
                    </Button>
                    <DeleteProduct
                      id_product={p.id_product}
                      token={token}
                      onRefresh={onRefresh}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={5} className="px-6 py-3">
                  <div className="flex flex-row w-full items-center justify-between">
                    <p className="text-sm text-gray-500">
                      Página {metadata.page} de {metadata.totalPages}
                    </p>

                    <div className="flex gap-2 items-center">
                      <button
                        onClick={handlePrevPage}
                        disabled={!metadata.hasPrevPage}
                        className="p-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      <button
                        onClick={handleNextPage}
                        disabled={!metadata.hasNextPage}
                        className="p-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>

                    <p className="text-sm text-gray-500">
                      Total: {metadata.total} productos
                    </p>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductList;
