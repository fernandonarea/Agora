import { SECRET_KEY } from "../config/config.js";
import { response_unauthorized } from "../Responses/responses.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json(response_unauthorized("Sin token, acceso no autorizado"));

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err)
      return res.status(401).json(response_unauthorized("Falta de token"));
    req.user = decoded;
    next();
  });
};

export const checkRole = (role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "No tienes permisos para acceder a esta ruta, ruta solo para administradores" });
    }
    next();
  };
};
