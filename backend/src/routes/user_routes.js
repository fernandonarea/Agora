import { Router } from "express";
import { verifyToken, checkRole } from "../middleware/auth.js";
import {
  login,
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/user_controller.js";
import { validateCreateUser } from "../middleware/validations.js";

const user_routes = new Router();

user_routes.get(
  "/api/users/allUsers",
  verifyToken,
  checkRole(["admin"]),
  getUsers
);
user_routes.get(
    "/api/users/getUserById/:id_user", 
    verifyToken, 
    getUserById
);

user_routes.post(
    "/api/users/login", 
    login
);

user_routes.post(
    "/api/users/register",
    validateCreateUser,
    createUser
);

user_routes.put(
    "/api/users/updateUser/:id_user", 
    verifyToken, 
    updateUser
);

user_routes.delete(
    "/api/users/deleteUser/:id_user", 
    verifyToken, 
    deleteUser
);

export default user_routes;
