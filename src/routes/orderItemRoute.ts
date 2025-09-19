import { Router, Request, Response } from "express";
import OrderItem from "../models/OrderItem";

const router = Router();

// Get all order items
router.get("/", async (_req: Request, res: Response) => {
  try {
    const items = await OrderItem.findAll();
    res.json(items);
  } catch {
    res.status(500).json({ error: "Failed to fetch order items" });
  }
});

// Get order item by id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const item = await OrderItem.findByPk(req.params.id);
    item ? res.json(item) : res.status(404).json({ error: "OrderItem not found" });
  } catch {
    res.status(500).json({ error: "Failed to fetch order item" });
  }
});

// Create new order item
router.post("/", async (req: Request, res: Response) => {
  try {
    const newItem = await OrderItem.create(req.body);
    res.status(201).json(newItem);
  } catch {
    res.status(500).json({ error: "Failed to create order item" });
  }
});

// Update order item
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const item = await OrderItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "OrderItem not found" });
    await item.update(req.body);
    res.json(item);
  } catch {
    res.status(500).json({ error: "Failed to update order item" });
  }
});

// Delete order item
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const item = await OrderItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "OrderItem not found" });
    await item.destroy();
    res.json({ message: "OrderItem deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete order item" });
  }
});

export default router;
