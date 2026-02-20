import { SECRET_KEY } from "../config/config.js";
import { response_unauthorized } from "../responses/responses.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json(response_unauthorized("Unauthorized: No token provided"));

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err)
      return res.status(401).json(response_unauthorized("Unauthorized: Invalid token"));
    req.user = decoded;
    req.id_store = decoded;
    next();
  });
};

export const checkRole = (role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "You don't have permission to access this resource or this action" });
    }
    next();
  };
};
