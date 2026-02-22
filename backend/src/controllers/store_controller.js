import { db_pool_connection } from "../database/db";
import {
  response_bad_request,
  response_created,
  response_error,
} from "../responses/responses";

export const createStore = async (req, res) => {
    const { store_name, store_description, store_address, store_phone } = req.body;
    try{
        const [rows] = await db_pool_connection.query(
            'INSERT INTO stores (store_name, id_owner, store_description, store_address, store_phone) VALUES (?, ?, ?, ?, ?)',
            [store_name, req.user.id_user, store_description, store_address, store_phone]
        )

        if (rows.affectedRows === 0) {
            return res.status(400).json(response_bad_request("Could not create the store"));
        }

        res.status(201).json(response_created(rows, "Store created successfully"));
    } catch (error) {
        console.error("Server error while creating store:", error);
        return res.status(500).json(response_error(500, "Server error while creating store"));
    }
}