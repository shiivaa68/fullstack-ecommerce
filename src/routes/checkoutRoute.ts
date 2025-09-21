import { Router } from "express";
import { checkout } from "../controllers/checkout.controller";
import { authenticate } from "../middlewares/auth";
import { checkoutValidator } from "../validators/checkoutValidator";
import { validate } from "../middlewares/validate";

const router = Router();

// POST /checkout
router.post("/", authenticate,checkoutValidator,validate, checkout);

export default router;
