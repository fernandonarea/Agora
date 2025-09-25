import { Router } from "express";
import { checkRole, verifyToken } from "../middleware/auth.js";
import { createSale, getAllSales } from "../controllers/sales_controller.js";

const sales_routes = new Router();

sales_routes.get(
    "/api/sales/getAllSales", 
    verifyToken, 
    checkRole(['admin']), 
    getAllSales
);

sales_routes.post(
    "/api/sales/createSale", 
    verifyToken, 
    checkRole(['admin']), 
    createSale
);

export default sales_routes;