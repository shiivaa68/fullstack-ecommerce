import { body } from "express-validator";

export const cartItemValidator = [
  body("cartId").isInt().withMessage("cartId must be an integer"),
  body("productId").isInt().withMessage("productId must be an integer"),
  body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
];
