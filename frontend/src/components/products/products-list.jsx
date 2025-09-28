import { useProducts } from "@/hooks/useProducts";
import { useEffect } from "react";

const ProductList = ({ token }) => {
  const { products, loading, error, fetchProducts } = useProducts();

  useEffect(() => {
    if (token) {
      fetchProducts(token);
    }
  }, [token]);

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if(error){
    return <div className="text-red-500">Error: {error}</div>
  }


  return (
    <div>
      {products.length === 0 ? (
        <p>No hay Productos</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p.id_product}>
              <span>{p.product_name}</span>{" "}
              <span className="text-gray-500">${p.product_price}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;