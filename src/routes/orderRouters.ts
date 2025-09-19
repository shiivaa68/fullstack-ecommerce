import { Router } from "express";
import Order from "../models/Order";

const router = Router();


// Create order
router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.json(order);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});
// Get all orders
router.get("/", async (_, res) => {
  const orders = await Order.findAll();
  res.json(orders);
});

// Get single order
router.get("/:id", async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
});

// Update order
router.put("/:id", async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  await order.update(req.body);
  res.json(order);
});
// Delete order
router.delete("/:id", async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  await order.destroy();
  res.json({ message: "Order deleted" });
});

export default router;