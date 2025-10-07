import { db_pool_connection } from "../database/db";
import {
  response_bad_request,
  response_created,
  response_error,
  response_not_found,
  response_success,
} from "../Responses/responses";

export const getAllSuppliers = async (req, res) => {
  try {
    const [rows] = await db_pool_connection.query(
      "SELECT supplier_name, supplier_phone, supplier_email, date_added FROM suppliers"
    );

    if (rows.length === 0)
      return res.status(404).json(response_not_found("No suppliers found"));

    res
      .status(200)
      .json(response_success(rows, "Suppliers retrieved successfully"));

    return response_success(res, rows);
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return res.status(500).json(response_error("Error fetching suppliers"));
  }
};

export const createSupplier = async (res, req) => {
  const { supplier_name, supplier_phone, supplier_email } = req.body;

  try {
    const [rows] = await db_pool_connection.query(
      "INSERT INTO suppliers (supplier_name, supplier_phone, supplier_email) VALUES (?, ?, ?)",
      [supplier_name, supplier_phone, supplier_email]
    );

    if (rows.affectedRows === 0)
      return res
        .status(400)
        .json(response_bad_request("Could not create supplier"));

    res
      .status(201)
      .json(response_created(rows, "Supplier created successfully"));
  } catch (error) {
    console.error("Error creating supplier:", error);
    return res.status(500).json(response_error("Error creating supplier"));
  }
};

export const deleteSupplier = async (res, req) => {
  const { id } = req.params;

  try {
    const [rows] = await db_pool_connection.query(
      "DELETE FROM suppliers WHERE id_supplier = ?",
      [id]
    );
    if (rows.affectedRows === 0)
      return res
        .status(404)
        .json(response_not_found("Supplier not found or ID incorrect"));

    res
      .status(200)
      .json(response_success(rows, "Supplier deleted successfully"));
  } catch (error) {
    console.error("Error deleting supplier:", error);
    return res.status(500).json(response_error("Error deleting supplier"));
  }
};
