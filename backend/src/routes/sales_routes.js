import { Router } from "express";
import { checkRole, verifyToken } from "../middleware/auth.js";
import {
  createSale,
  getAllSales,
  metrics,
  monthPerformance,
} from "../controllers/sales_controller.js";

const sales_routes = new Router();

sales_routes.get(
  "/api/sales/getAllSales",
  verifyToken,
  checkRole(["admin"]),
  getAllSales
);

sales_routes.get("/api/sales/getMetrics", verifyToken, metrics);

sales_routes.post("/api/sales/createSale", verifyToken, createSale);

sales_routes.get("/api/sales/monthPerformance", verifyToken, monthPerformance);

export default sales_routes;
