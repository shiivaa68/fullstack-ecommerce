import { body } from "express-validator";

export const orderValidator = [
  body("userId").isInt().withMessage("userId must be an integer"),
  body("totalPrice").isFloat({ min: 0 }).withMessage("Total price must be a positive number"),
];
