import { db_pool_connection } from "../database/db.js";
import { 
    response_created, 
    response_succes, 
    response_error, 
    response_bad_request, 
    response_not_found, 
    response_unauthorized } from "../Responses/responses.js";
import bcrypt from "bcryptjs";


export const createUser = async (req, res) => {
    try {
        const { name, lastname, role, username, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const [rows] = await db_pool_connection.query(`INSERT INTO users (name, lastname, role, username, password 
            VALUES (?, ?, ?, ?, ?)`,
            [name, lastname, role, username, hashedPassword]
        );

        if(rows.affectedRows === 0){
            return res.status(400).json(response_bad_request("No se pudo crear el usuario"))
        }
        res.status(201).json(response_created(rows, "Usuario creado con exito"))

    } catch (error) {
        return res.status(500).json(response_error(500, "Error en el servidor intente nuevamente " + error))
    }
}


export const login = async (req, res) => {
    try {
        
        const {username, password} = req.body;

        if(!username|| !password){
            return res.status(400).json(response_bad_request('Complete todos los campos'));
        };

        const [rows] = await db_pool_connection.query('SELECT * FROM users WHERE username = ?', [username])

        if(rows.affectedRows === 0){
            return res.status(404).json(response_not_found("Usuario no encontrado"));
        };

        const user = rows[0];

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(401).json(response_unauthorized("Contraseña incorrecta"));
        };

        res.status(200).json(response_succes(user, "Inicio de sesión exitoso"))

    } catch (error) {
        return res.status(500).json(response_error(500, "Error en el servidor intente nuevamente " + error))
    }
}