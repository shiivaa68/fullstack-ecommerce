import { Router, Response } from "express";
import OrderItem from "../models/OrderItem";
import Order from "../models/Order";
import { authenticate, AuthRequest } from "../middlewares/auth";
import { cartItemValidator } from "../validators/cartItemValidator";
import { validate } from "../middlewares/validate";
import Product from "../models/Product";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/AppError";

const router = Router();

// ✅ Add item to order
router.post(
  "/",
  authenticate,
  cartItemValidator,
  validate,
  catchAsync(async (req: AuthRequest, res: Response) => {
    const { orderId, productId, quantity } = req.body;

    const order = await Order.findOne({ where: { id: orderId, userId: req.user.id } });
    if (!order) throw new AppError("Order not found", 404);

    const product = await Product.findByPk(productId);
    if (!product) throw new AppError("Product not found", 404);

    const orderItem = await OrderItem.create({
      orderId,
      productId,
      quantity,
      price: product.price, // freeze product price at time of purchase
    });

    res.status(201).json(orderItem);
  })
);

// ✅ Get items of an order
router.get(
  "/:orderId",
  authenticate,
  catchAsync(async (req: AuthRequest, res: Response) => {
    const order = await Order.findOne({ where: { id: req.params.orderId, userId: req.user.id } });
    if (!order) throw new AppError("Order not found", 404);

    const items = await OrderItem.findAll({ where: { orderId: req.params.orderId } });
    res.json(items);
  })
);

// ✅ Update order item
router.put(
  "/:id",
  authenticate,
  cartItemValidator, // can reuse same validator (quantity required, etc.)
  validate,
  catchAsync(async (req: AuthRequest, res: Response) => {
    const orderItem = await OrderItem.findByPk(req.params.id);
    if (!orderItem) throw new AppError("Order item not found", 404);

    await orderItem.update(req.body);
    res.json(orderItem);
  })
);

// ✅ Delete order item
router.delete(
  "/:id",
  authenticate,
  catchAsync(async (req: AuthRequest, res: Response) => {
    const orderItem = await OrderItem.findByPk(req.params.id);
    if (!orderItem) throw new AppError("Order item not found", 404);

    await orderItem.destroy();
    res.json({ message: "Order item deleted" });
  })
);

export default router;
