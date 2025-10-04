import { check, validationResult } from "express-validator";
import { response_bad_request } from "../responses/responses.js";

export const validateCreateUser = [
  check("user_name")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio"),
  check("user_lastname").notEmpty().withMessage("El apellido es obligatorio"),
  check("user_email")
    .isEmail()
    .withMessage("El correo electrónico no es válido"),
  check("role")
    .isIn(["admin", "user"])
    .withMessage("El rol debe ser admin o user"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(
        response_bad_request(
          errors
            .array()
            .map((err) => err.msg)
            .join(", ")
        )
      );
    }
    next();
  },
];

export const validateCreateProduct = [
  check("product_name")
    .notEmpty()
    .withMessage("El nombre del producto es obligatorio"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(
        response_bad_request(
          errors
            .array()
            .map((err) => err.msg)
            .join(", ")
        )
      );
    }
    next();
  },
];
