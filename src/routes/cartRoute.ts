import { Router } from "express";
import Cart from "../models/Cart";

const router = Router();

// Create cart
router.post("/", async (req, res) => {
  try {
    const cart = await Cart.create(req.body);
    res.json(cart);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Get all carts
router.get("/", async (_, res) => {
  const carts = await Cart.findAll();
  res.json(carts);
});

// Get single cart
router.get("/:id", async (req, res) => {
  const cart = await Cart.findByPk(req.params.id);
  if (!cart) return res.status(404).json({ error: "Cart not found" });
  res.json(cart);
});

// Update cart
router.put("/:id", async (req, res) => {
  const cart = await Cart.findByPk(req.params.id);
  if (!cart) return res.status(404).json({ error: "Cart not found" });
  await cart.update(req.body);
  res.json(cart);
});

// Delete cart
router.delete("/:id", async (req, res) => {
  const cart = await Cart.findByPk(req.params.id);
  if (!cart) return res.status(404).json({ error: "Cart not found" });
  await cart.destroy();
  res.json({ message: "Cart deleted" });
});

export default router;
