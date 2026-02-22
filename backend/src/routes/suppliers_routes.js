import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  updateSupplier,
} from "../controllers/suppliers_controller.js";

const suppliers_routes = new Router();

suppliers_routes.get("/api/suppliers", verifyToken, getAllSuppliers);

suppliers_routes.post("/api/suppliers", verifyToken, createSupplier);

suppliers_routes.put("/api/suppliers/:id_supplier", verifyToken, updateSupplier);

suppliers_routes.delete("/api/suppliers/:id_supplier", verifyToken, deleteSupplier);


export default suppliers_routes;