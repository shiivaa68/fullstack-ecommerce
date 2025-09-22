import { Router, Response } from "express";
import Order from "../models/Order";
import { authenticate, AuthRequest } from "../middlewares/auth";
import { orderValidator } from "../validators/orderValidator"; 
import { validate } from "../middlewares/validate";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/AppError";

const router = Router();

// Create order
router.post(
  "/",
  authenticate,orderValidator,validate,
  catchAsync(async (req: AuthRequest, res: Response) => {
    const order = await Order.create({ ...req.body, userId: req.user.id });
    res.json(order);
  })
);

// Get all orders for logged-in user
router.get(
  "/",
  authenticate,
  catchAsync(async (req: AuthRequest, res: Response) => {
    const orders = await Order.findAll({ where: { userId: req.user.id } });
    res.json(orders);
  })
);

// Get single order
router.get(
  "/:id",
  authenticate,
  catchAsync(async (req: AuthRequest, res: Response) => {
    const order = await Order.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!order) throw new AppError("Order not found", 404);
    res.json(order);
  })
);

// Update order
router.put(
  "/:id",
  authenticate,
  catchAsync(async (req: AuthRequest, res: Response) => {
    const order = await Order.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!order) throw new AppError("Order not found", 404);
    await order.update(req.body);
    res.json(order);
  })
);

// Delete order
router.delete(
  "/:id",
  authenticate,
  catchAsync(async (req: AuthRequest, res: Response) => {
    const order = await Order.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!order) throw new AppError("Order not found", 404);
    await order.destroy();
    res.json({ message: "Order deleted" });
  })
);

export default router;
