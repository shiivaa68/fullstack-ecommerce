import { Router } from "express";
import OrderItem from "../models/OrderItem";
import Order from "../models/Order";
import { authenticate, AuthRequest } from "../middlewares/auth";
import Product from "../models/Product";


const router = Router();

// Add item to order
router.post("/", authenticate, async (req: AuthRequest, res) => {
  try {
    const { orderId, productId, quantity } = req.body;

    const order = await Order.findOne({ where: { id: orderId, userId: req.user.id } });
    if (!order) return res.status(404).json({ error: "Order not found" });

    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const orderItem = await OrderItem.create({
      orderId,
      productId,
      quantity,
      price: product.price, // ✅ freeze product price
    });

    res.json(orderItem);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Get items of an order
router.get("/:orderId", authenticate, async (req: AuthRequest, res) => {
  const order = await Order.findOne({ where: { id: req.params.orderId, userId: req.user.id } });
  if (!order) return res.status(404).json({ error: "Order not found" });

  const items = await OrderItem.findAll({ where: { orderId: req.params.orderId } });
  res.json(items);
});

// Update order item
router.put("/:id", authenticate, async (req: AuthRequest, res) => {
  const orderItem = await OrderItem.findByPk(req.params.id);
  if (!orderItem) return res.status(404).json({ error: "Order item not found" });
  await orderItem.update(req.body);
  res.json(orderItem);
});

// Delete order item
router.delete("/:id", authenticate, async (req: AuthRequest, res) => {
  const orderItem = await OrderItem.findByPk(req.params.id);
  if (!orderItem) return res.status(404).json({ error: "Order item not found" });
  await orderItem.destroy();
  res.json({ message: "Order item deleted" });
});

export default router;
