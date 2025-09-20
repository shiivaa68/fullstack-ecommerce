import { Router } from "express";
import Order from "../models/Order";
import { authenticate, AuthRequest } from "../middlewares/auth";

const router = Router();

// Create order
router.post("/", authenticate, async (req: AuthRequest, res) => {
  try {
    const order = await Order.create({ ...req.body, userId: req.user.id });
    res.json(order);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Get all orders for logged-in user
router.get("/", authenticate, async (req: AuthRequest, res) => {
  const orders = await Order.findAll({ where: { userId: req.user.id } });
  res.json(orders);
});

// Get single order
router.get("/:id", authenticate, async (req: AuthRequest, res) => {
  const order = await Order.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
});

// Update order
router.put("/:id", authenticate, async (req: AuthRequest, res) => {
  const order = await Order.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!order) return res.status(404).json({ error: "Order not found" });
  await order.update(req.body);
  res.json(order);
});

// Delete order
router.delete("/:id", authenticate, async (req: AuthRequest, res) => {
  const order = await Order.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!order) return res.status(404).json({ error: "Order not found" });
  await order.destroy();
  res.json({ message: "Order deleted" });
});

export default router;
