import { useProducts } from "@/hooks/useProducts";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import { DeleteProduct } from "./crud/delete-product";
import { UpdateProductForm } from "./crud/update-product";
import { Input } from "../ui/input";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";

const ProductList = ({ token }) => {
  const { products, loading, fetchProducts, metadata} = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [search, setSearch] = useState("");
  const limit = 10;

  useEffect(() => {
    if (token) fetchProducts(token, currentPage, limit);
  }, [token, currentPage]);

  useEffect(() => {
    if (deleteError) {
      const timer = setTimeout(() => setDeleteError(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [deleteError]);

  // if (error) return <div>{error}</div>;

  const handlePrevPage = () =>
    metadata.hasPrevPage && setCurrentPage((p) => p - 1);
  const handleNextPage = () =>
    metadata.hasNextPage && setCurrentPage((p) => p + 1);

  const handleSearch = (e) => setSearch(e.target.value);
  const filterProducts = !search
    ? products
    : products.filter((product) =>
        product.product_name.toLowerCase().includes(search.toLowerCase())
      );

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleRefresh = () => {
    fetchProducts(token, currentPage, limit);
  };

  return (
    <div className="flex flex-col gap-5 w-full p-4">
      <Input
        value={search}
        onChange={handleSearch}
        placeholder="Buscar producto por nombre"
      />
      {loading ? (
        <div>Cargando productos...</div>
      ) : (
        <div className="border border-gray-200 rounded-lg shadow-xs overflow-auto dark:border-neutral-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
            <thead className="bg-gray-50 dark:bg-neutral-700">
              <tr>
                <th className="px-5 py-3 text-start text-xs font-medium">
                  Nombre
                </th>
                <th className="px-5 py-3 text-start text-xs font-medium">
                  Descripción
                </th>
                <th className="px-5 py-3 text-start text-xs font-medium">
                  Precio
                </th>
                <th className="px-5 py-3 text-start text-xs font-medium">
                  Stock
                </th>
                <th className="px-5 py-3 text-start text-xs font-medium">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-neutral-700">
              {filterProducts.map((p) => (
                <tr
                  key={p.id_product}
                  className="hover:bg-gray-100 dark:hover:bg-neutral-800"
                >
                  <td className="px-6 py-3">{p.product_name}</td>
                  <td className="px-6 py-3">{p.product_description}</td>
                  <td className="px-6 py-3">${p.product_price}</td>
                  <td className="px-6 py-3">{p.stock} u</td>
                  <td className="flex gap-3 px-6 py-3">
                    <Button
                      variant="outline"
                      className="hover:bg-violet-500 hover:text-white dark:hover:bg-violet-700"
                      onClick={() => handleEdit(p)}
                    >
                      <Pencil size={16} />
                    </Button>

                    <DeleteProduct
                      id_product={p.id_product}
                      token={token}
                      onRefresh={handleRefresh}
                      showError={setDeleteError}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-row gap-10 items-center justify-center p-2">
            <Button
              onClick={handlePrevPage}
              disabled={!metadata.hasPrevPage}
              variant="outline"
            >
              <ChevronLeft size={20} />
            </Button>
            <p>
              Página {metadata.page} de {metadata.totalPages}
            </p>
            <Button
              onClick={handleNextPage}
              disabled={!metadata.hasNextPage}
              variant="outline"
            >
              <ChevronRight size={20} />
            </Button>
            <p className="text-sm text-muted-foreground">
              Total de productos: {metadata.total}
            </p>
          </div>
        </div>
      )}

      <UpdateProductForm
        token={token}
        product={selectedProduct}
        isOpen={open}
        onClose={() => setOpen(false)}
        onUpdated={handleRefresh}
      />
    </div>
  );
};

export default ProductList;