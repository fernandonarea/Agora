import { Router } from "express";
import {
  generate_sale_invoice,
  all_products_report,
} from "../controllers/reports_controller.js";
import { checkRole, verifyToken } from "../middleware/auth.js";

const reports_routes = new Router();

reports_routes.get("/sales/inventory/pdf", all_products_report);
reports_routes.get("/sales/:id_sales/pdf", generate_sale_invoice);

export default reports_routes;
