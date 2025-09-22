import { Router, Response } from "express";
import Order from "../models/Order";
import { authenticate, AuthRequest } from "../middlewares/auth";
import { checkoutValidator } from "../validators/checkoutValidator";
import { validate } from "../middlewares/validate";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/AppError";

const router = Router();

// Create checkout order
router.post(
  "/",
  authenticate,
  checkoutValidator,
  validate,
  catchAsync(async (req: AuthRequest, res: Response) => {
    const order = await Order.create({ ...req.body, userId: req.user.id });
    res.json(order);
  })
);

// Get all checkout orders for logged-in user
router.get(
  "/",
  authenticate,
  catchAsync(async (req: AuthRequest, res: Response) => {
    const orders = await Order.findAll({ where: { userId: req.user.id } });
    res.json(orders);
  })
);

// Get single checkout order
router.get(
  "/:id",
  authenticate,
  catchAsync(async (req: AuthRequest, res: Response) => {
    const order = await Order.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!order) throw new AppError("Order not found", 404);
    res.json(order);
  })
);

export default router;
