import { Router, Response } from "express";
import CartItem from "../models/CartItem";
import Cart from "../models/Cart";
import { authenticate, AuthRequest } from "../middlewares/auth";
import { cartItemValidator } from "../validators/cartItemValidator";
import { validate } from "../middlewares/validate";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/AppError";

const router = Router();

// ✅ Add item to cart
router.post(
  "/",
  authenticate,
  cartItemValidator,
  validate,
  catchAsync(async (req: AuthRequest, res: Response) => {
    const { cartId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ where: { id: cartId, userId: req.user.id } });
    if (!cart) throw new AppError("Cart not found", 404);

    const cartItem = await CartItem.create({ cartId, productId, quantity });
    res.status(201).json(cartItem);
  })
);

// ✅ Get items of a cart
router.get(
  "/:cartId",
  authenticate,
  catchAsync(async (req: AuthRequest, res: Response) => {
    const cart = await Cart.findOne({ where: { id: req.params.cartId, userId: req.user.id } });
    if (!cart) throw new AppError("Cart not found", 404);

    const items = await CartItem.findAll({ where: { cartId: req.params.cartId } });
    res.json(items);
  })
);

// ✅ Update cart item
router.put(
  "/:id",
  authenticate,
  cartItemValidator, // reuse validator (quantity required)
  validate,
  catchAsync(async (req: AuthRequest, res: Response) => {
    const cartItem = await CartItem.findByPk(req.params.id);
    if (!cartItem) throw new AppError("Cart item not found", 404);

    await cartItem.update(req.body);
    res.json(cartItem);
  })
);

// ✅ Delete cart item
router.delete(
  "/:id",
  authenticate,
  catchAsync(async (req: AuthRequest, res: Response) => {
    const cartItem = await CartItem.findByPk(req.params.id);
    if (!cartItem) throw new AppError("Cart item not found", 404);

    await cartItem.destroy();
    res.json({ message: "Cart item deleted" });
  })
);

export default router;
