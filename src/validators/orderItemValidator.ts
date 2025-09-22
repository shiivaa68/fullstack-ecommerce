import { body } from "express-validator";

export const orderItemValidator = [
  body("orderId").isInt().withMessage("orderId must be an integer"),
  body("productId").isInt().withMessage("productId must be an integer"),
  body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
  body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
];
