import { Router, Request, Response } from "express";
import CartItem from "../models/CartItem";

const router = Router();

// Get all cart items
router.get("/", async (_req: Request, res: Response) => {
  try {
    const items = await CartItem.findAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
});

// Get cart item by id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const item = await CartItem.findByPk(req.params.id);
    item ? res.json(item) : res.status(404).json({ error: "CartItem not found" });
  } catch {
    res.status(500).json({ error: "Failed to fetch cart item" });
  }
});

// Add new cart item
router.post("/", async (req: Request, res: Response) => {
  try {
    const newItem = await CartItem.create(req.body);
    res.status(201).json(newItem);
  } catch {
    res.status(500).json({ error: "Failed to create cart item" });
  }
});

// Update cart item
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const item = await CartItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "CartItem not found" });
    await item.update(req.body);
    res.json(item);
  } catch {
    res.status(500).json({ error: "Failed to update cart item" });
  }
});

// Delete cart item
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const item = await CartItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "CartItem not found" });
    await item.destroy();
    res.json({ message: "CartItem deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete cart item" });
  }
});

export default router;
