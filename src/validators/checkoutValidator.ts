import { body } from "express-validator";

export const checkoutValidator = [
  body("cartId").isInt().withMessage("cartId must be a number"),
  body("paymentMethod")
    .isIn(["credit_card", "paypal", "cash_on_delivery"])
    .withMessage("Invalid payment method"),
];
