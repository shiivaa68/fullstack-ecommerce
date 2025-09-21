import { body } from "express-validator";

export const productValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("price").isFloat({ gt: 0 }).withMessage("Price must be > 0"),
  body("stock").isInt({ min: 0 }).withMessage("Stock must be >= 0"),
];
