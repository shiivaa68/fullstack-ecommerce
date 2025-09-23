import { Router, Response } from "express";
import Order from "../models/Order";
import OrderItem from "../models/OrderItem";
import Product from "../models/Product";
import { authenticate, AuthRequest } from "../middlewares/auth";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/AppError";

const router = Router();

/**
 * ✅ Checkout route
 * - Finds the order
 * - Calculates total from frozen product prices
 * - Updates order status
 */
router.post(
  "/:orderId",
  authenticate,
  catchAsync(async (req: AuthRequest, res: Response) => {
    const order = await Order.findOne({ where: { id: req.params.orderId, userId: req.user.id } });
    if (!order) throw new AppError("Order not found", 404);

    const items = await OrderItem.findAll({ where: { orderId: order.id } });
    if (!items.length) throw new AppError("Order has no items", 400);

    // calculate total based on frozen item prices
    let total = 0;
    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product) throw new AppError(`Product ${item.productId} not found`, 404);
      total += item.price * item.quantity;
    }

    await order.update({ status: "completed", total });

    res.json({ message: "Checkout successful", order, items, total });
  })
);

export default router;
