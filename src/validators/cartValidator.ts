import { body } from "express-validator";

export const cartValidator = [
  body("userId").isInt().withMessage("userId must be an integer"),
];
