import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const ProductsForm = (token) => {
  const { newProduct, error, loading } = useProducts();
  const [productData, setProductData] = useState({
    product_name: "",
    product_description: "",
    product_price: "",
    stock: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await newProduct(token, productData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Create a New Product</h1>
        <p>Add a new product to your inventory</p>
      </div>
      <div>
        <div>
          <Label>Product Name</Label>
          <Input
            id="product_name"
            type="text"
            onChange={handleChange}
            value={productData.product_name}
            placeholder="Ruffles 500g"
            required
            disabled={loading}
          />
        </div>

        <div>
          <Label>Product Description</Label>
          <Input
            id="product_description"
            type="text"
            onChange={handleChange}
            value={productData.product_description}
            placeholder="Add a brief description to the product"
            required
            disabled={loading}
          />
        </div>

        <div>
          <Label>Product Price</Label>
          <Input
            id="product_price"
            type="number"
            onChange={handleChange}
            value={productData.product_price}
            placeholder="5"
            required
            disabled={loading}
          />
        </div>

        <div>
          <Label>Product Stock</Label>
          <Input
            id="stock"
            type="number"
            onChange={handleChange}
            value={productData.stock}
            placeholder="50"
            required
            disabled={loading}
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm font-medium text-center">
            {error}
          </p>
        )}
        <Button
          type="submit"
          className="w-full bg-violet-700 hover:bg-violet-800"
          disabled={loading}
        >
          {loading ? "Loading..." : "Create Product"}
        </Button>
      </div>
    </form>
  );
};

export default ProductsForm;
