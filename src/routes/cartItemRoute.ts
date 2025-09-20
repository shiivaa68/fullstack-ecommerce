import { Router } from "express";
import CartItem from "../models/CartItem";
import Cart from "../models/Cart";
import { authenticate, AuthRequest } from "../middlewares/auth";

const router = Router();

// Add item to cart
router.post("/", authenticate, async (req: AuthRequest, res) => {
  try {
    const { cartId, productId, quantity } = req.body;
    const cart = await Cart.findOne({ where: { id: cartId, userId: req.user.id } });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const cartItem = await CartItem.create({ cartId, productId, quantity });
    res.json(cartItem);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Get items of a cart
router.get("/:cartId", authenticate, async (req: AuthRequest, res) => {
  const cart = await Cart.findOne({ where: { id: req.params.cartId, userId: req.user.id } });
  if (!cart) return res.status(404).json({ error: "Cart not found" });

  const items = await CartItem.findAll({ where: { cartId: req.params.cartId } });
  res.json(items);
});

// Update cart item
router.put("/:id", authenticate, async (req: AuthRequest, res) => {
  const cartItem = await CartItem.findByPk(req.params.id);
  if (!cartItem) return res.status(404).json({ error: "Cart item not found" });
  await cartItem.update(req.body);
  res.json(cartItem);
});

// Delete cart item
router.delete("/:id", authenticate, async (req: AuthRequest, res) => {
  const cartItem = await CartItem.findByPk(req.params.id);
  if (!cartItem) return res.status(404).json({ error: "Cart item not found" });
  await cartItem.destroy();
  res.json({ message: "Cart item deleted" });
});

export default router;
