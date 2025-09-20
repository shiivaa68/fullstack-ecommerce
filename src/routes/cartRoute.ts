import { Router } from "express";
import Cart from "../models/Cart";
import { authenticate, AuthRequest } from "../middlewares/auth";

const router = Router();

// Create cart (requires login)
router.post("/", authenticate, async (req: AuthRequest, res) => {
  try {
    const cart = await Cart.create({ userId: req.user.id });
    res.json(cart);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Get all carts for logged-in user
router.get("/", authenticate, async (req: AuthRequest, res) => {
  try {
    const carts = await Cart.findAll({ where: { userId: req.user.id } });
    res.json(carts);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Get single cart
router.get("/:id", authenticate, async (req: AuthRequest, res) => {
  const cart = await Cart.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!cart) return res.status(404).json({ error: "Cart not found" });
  res.json(cart);
});

// Update cart
router.put("/:id", authenticate, async (req: AuthRequest, res) => {
  const cart = await Cart.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!cart) return res.status(404).json({ error: "Cart not found" });
  await cart.update(req.body);
  res.json(cart);
});

// Delete cart
router.delete("/:id", authenticate, async (req: AuthRequest, res) => {
  const cart = await Cart.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!cart) return res.status(404).json({ error: "Cart not found" });
  await cart.destroy();
  res.json({ message: "Cart deleted" });
});

export default router;
