import { check, validationResult } from "express-validator";
import { response_bad_request } from "../responses/responses.js";

export const validateCreateUser = [
  check("user_name")
    .notEmpty()
    .withMessage("User name is required"),
  check("user_lastname").notEmpty().withMessage("User lastname is required"),
  check("user_email")
    .isEmail()
    .withMessage("User email is not valid"),
  check("role")
    .isIn(["admin", "user"])
    .withMessage("Role must be admin or user"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
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
    .withMessage("Product name is required"),
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
