import { db_pool_connection } from "../database/db.js";
import { response_created, response_succes, response_error, response_bad_request, response_not_found, response_unauthorized } from "../Responses/responses.js";

export const createUser = async (req, res) => {
    try {
        const { name, lastname, role, username, password } = req.body;
        
        const [rows] = await db_pool_connection.query(`INSERT INTO users (name, lastname, role, username, password 
            VALUES (?, ?, ?, ?, ?)`,
            [name, lastname, role, username, password]
        );

        if(rows.affectedRows === 0){
            return res.status(400).json(response_bad_request("No se pudo crear el usuario"))
        }
        res.status(201).json(response_created(rows, "Usuario creado con exito"))

    } catch (error) {
        return res.status(500).json(response_error(500, "Error en el servidor intente nuevamente " + error))
    }
}