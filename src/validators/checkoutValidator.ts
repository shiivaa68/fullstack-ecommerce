import { body } from "express-validator";

export const checkoutValidator = [
  body("cartId").isInt().withMessage("cartId must be an integer"),
  body("address").isString().isLength({ min: 5 }).withMessage("Address must be at least 5 characters"),
  body("paymentMethod")
    .isIn(["credit_card", "paypal", "bank_transfer"])
    .withMessage("Payment method must be one of: credit_card, paypal, bank_transfer"),
];
