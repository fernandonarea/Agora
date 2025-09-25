import { Router } from "express";
import {
    createProduct,
  deleteProduct,
  getBestSellingProducts,
  getProductById,
  getProductByName,
  getProducts,
  updateProduct,
} from "../controllers/products_controller.js";
import { checkRole, verifyToken } from "../middleware/auth.js";

const products_routes = new Router();

//GET
products_routes.get(
    "/api/products/getProducts", 
    verifyToken, 
    getProducts
);

products_routes.get(
  "/api/products/getProductByName",
  verifyToken,
  getProductByName
);

products_routes.get(
  "/api/products/getProductById/:id_product",
  verifyToken,
  getProductById
);

products_routes.get(
  "/api/products/getBestSellingProducts",
  verifyToken,
  getBestSellingProducts
);

//POST
products_routes.post(
    "/api/products/createProduct", 
    verifyToken, 
    checkRole(['admin']), 
    createProduct
);

//PUT
products_routes.put(
    "/api/products/updateProduct/:id_product", 
    verifyToken, 
    checkRole(['admin']),
    updateProduct
);

//DELETE
products_routes.delete(
    "/api/products/deleteProduct/:id_product",
    verifyToken,
    checkRole(['admin']),
    deleteProduct
);

export default products_routes;