import { db_pool_connection } from "../database/db.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { 
    response_bad_request, 
    response_created, 
    response_error, 
    response_succes, 
    response_unauthorized, 
    response_not_found } from "../Responses/responses.js";

export const createUser = async (req, res) => {
    try {
        const { user_name, user_lastname, role, user_email, password } = req.body;
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const [rows] = await db_pool_connection.query(`INSERT INTO users (user_name, user_lastname, role, user_email, password) 
            VALUES (?, ?, ?, ?, ?)`,
            [user_name, user_lastname, role, user_email, hashedPassword]
        );

        if(rows.affectedRows === 0){
            return res.status(400).json(response_bad_request("No se pudo crear el usuario"))
        }
        res.status(201).json(response_created(rows, "Usuario creado con exito"))

    } catch (error) {
        return res.status(500).json(response_error(500, "Error en el servidor intente nuevamente " + error))
    }
}

export const getUserById = async (req, res) => {
    try {
        const {id_user} = req.params;

        const [rows] = await db_pool_connection.query(`SELECT user_name, user_lastname, role, user_email, profile_photo, phone_number 
            FROM users WHERE id_user = ?`, id_user);

        if(rows.length === 0){
            return res.status(404).json(response_not_found("Usuario no encontrado o ID incorrecto"))
        }
        res.status(200).json(response_succes(rows, "Usuario encontrado con exito"))

    } catch (error) {
        return res.status(500).json(response_error(500, "Error en el servidor intente nuevamente " + error))
    }
}

export const getUsers = async (req, res) => {
    try {
        const [rows] = await db_pool_connection.query('SELECT user_name, user_lastname, role, user_email, profile_photo, phone_number from users');

        if(rows.length === 0){
            return res.status(404).json(response_not_found("Usuarios no encontrados"))
        }
        res.status(200).json(response_succes(rows, "Usuarios encontrados con exito"))

    } catch (error) {
        return res.status(500).json(response_error(500, "Error en el servidor intente nuevamente " + error))
    }
}

export const updateUser = async (req, res) => {
    try {
        
        const {user_name, user_lastname, user_email, profile_photo, phone_number} = req.body;
        const {id_user} = req.params;

        const [rows] = await db_pool_connection.query(
            `UPDATE users 
            SET
                user_name = COALESCE(?, user_name),
                user_lastname = COALESCE(?, user_lastname),
                user_email = COALESCE(?, user_email),
                profile_photo = COALESCE(?, profile_photo),
                phone_number = COALESCE(?, phone_number)
            WHERE id_user = ?`,

            [user_name, user_lastname, user_email, profile_photo, phone_number, id_user]
        );

        if(rows.affectedRows === 0){
            return res.status(403).json(response_bad_request("No se pudo actualizar el usuario, usuario no encontrado"))
        };
        res.status(200).json(response_succes(rows, "Usuario actualizado con exito"));


    } catch (error) {
        return res.status(500).json(response_error(500, "Error en el servidor intente nuevamente, " + error['sqlMessage']));
    }
}

export const deleteUser = async (req, res) => {
    try {
        const {id_user} = req.params;

        const [rows] = await db_pool_connection.query(`DELETE FROM users WHERE id_user = ?`, id_user);

        if(rows.affectedRows === 0){
            return res.status(404).json(response_not_found("No se pudo eliminar el usuario, usuario no encontrado o ID incorrecto"))
        }
        
        res.status(200).json(response_succes(rows, "Usuario eliminado con exito"))

    } catch (error) {
        return res.status(500).json(response_error(500, "Error en el servidor intente nuevamente " + error['sqlMessage']))
    }
}

export const login = async (req, res) => {
    try {
        
        const {user_email, password} = req.body;

        if(!user_email|| !password){
            return res.status(400).json(response_bad_request('Complete todos los campos'));
        };

        const [rows] = await db_pool_connection.query('SELECT * FROM users WHERE user_email = ?', [user_email])


        if(rows.length === 0){
            return res.status(404).json(response_not_found("Usuario no encontrado"));
        };

        const user = rows[0];

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(401).json(response_unauthorized("Contraseña incorrecta"));
        };

        const token = jwt.sign(
            {id_user: user.id_user, role: user.role},
            process.env.SECRET_JWT_KEY,
            {expiresIn: '1h'}
        );

        res.status(200).json(response_succes({token, id_user:user.id_user}), 'Inicio de sesion exitoso')

    } catch (error) {
        return res.status(500).json(response_error(500, "Error en el servidor intente nuevamente " + error))
    }
}