import { db_pool_connection } from "../database/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  response_bad_request,
  response_created,
  response_error,
  response_success,
  response_not_found,
  response_unauthorized,
} from "../responses/responses.js";

export const createUser = async (req, res) => {
  try {
    const { user_name, user_lastname, role, user_email, password } = req.body;

    const existingUser = await db_pool_connection.query("SELECT * FROM users WHERE user_email = ?", [user_email]);

    if(existingUser[0].length > 0) {
      return res.status(400).json(response_bad_request("Email already in use"));
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [rows] = await db_pool_connection.query(
      `INSERT INTO users (user_name, user_lastname, role, user_email, password) 
      VALUES (?, ?, ?, ?, ?)`,
      [user_name, user_lastname, role, user_email, hashedPassword]
    );

    if (rows.affectedRows === 0) {
      return res
        .status(400)
        .json(response_bad_request("Could not create the user"));
    }
    res.status(201).json(response_created(rows, "User created successfully"));
  } catch (error) {
    console.error("Server error while creating user:", error);
    return res
      .status(500)
      .json(
        response_error(500, "Server error, please try again: " + error)
      );
  }
};

export const getUserById = async (req, res) => {
  try {
    const id_user = req.user.id_user;

    const [rows] = await db_pool_connection.query(
      `SELECT user_name, user_lastname, role, user_email, profile_photo, phone_number 
            FROM users WHERE id_user = ?`,
      id_user
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json(response_not_found("User not found or incorrect ID"));
    }
    res.status(200).json(response_success(rows, "User retrieved successfully"));
  } catch (error) {
    console.error("Server error while fetching user by id:", error);
    return res
      .status(500)
      .json(
        response_error(500, "Server error, please try again: " + error)
      );
  }
};

export const getUsers = async (req, res) => {
  try {
    const [rows] = await db_pool_connection.query(
      "SELECT user_name, user_lastname, role, user_email, profile_photo, phone_number FROM users"
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json(response_not_found("No users found"));
    }
    res
      .status(200)
      .json(response_success(rows, "Users retrieved successfully"));
  } catch (error) {
    console.error("Server error while fetching users:", error);
    return res
      .status(500)
      .json(
        response_error(500, "Server error, please try again: " + error)
      );
  }
};

export const updateUser = async (req, res) => {
  try {
    const {
      user_name,
      user_lastname,
      user_email,
      profile_photo,
      phone_number,
    } = req.body;
    const id_user = req.user.id_user;

    const [rows] = await db_pool_connection.query(
      `UPDATE users 
            SET
                user_name = COALESCE(?, user_name),
                user_lastname = COALESCE(?, user_lastname),
                user_email = COALESCE(?, user_email),
                profile_photo = COALESCE(?, profile_photo),
                phone_number = COALESCE(?, phone_number)
            WHERE id_user = ?`,

      [
        user_name,
        user_lastname,
        user_email,
        profile_photo,
        phone_number,
        id_user,
      ]
    );

    if (rows.affectedRows === 0) {
      return res
        .status(403)
        .json(
          response_bad_request(
            "Could not update user: user not found"
          )
        );
    }
    res
      .status(200)
      .json(response_success(rows, "User updated successfully"));
  } catch (error) {
    console.error("Server error while updating user:", error);
    return res
      .status(500)
      .json(
        response_error(
          500,
          "Server error, please try again: " + (error["sqlMessage"] || error)
        )
      );
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id_user } = req.params;

    const [rows] = await db_pool_connection.query(
      `DELETE FROM users WHERE id_user = ?`,
      id_user
    );

    if (rows.affectedRows === 0) {
      return res
        .status(404)
        .json(
          response_not_found(
            "Could not delete user: user not found or incorrect ID"
          )
        );
    }

    res.status(200).json(response_success(rows, "User deleted successfully"));
  } catch (error) {
    console.error("Server error while deleting user:", error);
    return res
      .status(500)
      .json(
        response_error(
          500,
          "Server error, please try again: " + (error["sqlMessage"] || error)
        )
      );
  }
};

export const login = async (req, res) => {
  try {
    const { user_email, password } = req.body;

    if (!user_email || !password) {
      return res
        .status(400)
        .json(response_bad_request("Please complete all fields"));
    }

    const [rows] = await db_pool_connection.query(
      "SELECT * FROM users WHERE user_email = ?",
      [user_email]
    );

    if (rows.length === 0) {
      return res.status(404).json(response_not_found("User not found"));
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json(response_unauthorized("Incorrect password"));
    }

    const token = jwt.sign(
      { id_user: user.id_user, role: user.role },
      process.env.SECRET_JWT_KEY,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json(
        response_success({ token, role: user.role }, "Login successful")
      );
  } catch (error) {
    console.error("Server error during login:", error);
    return res
      .status(500)
      .json(
        response_error(500, "Server error, please try again: " + error)
      );
  }
};
