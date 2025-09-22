import { Router, Response } from "express";
import Cart from "../models/Cart";
import { authenticate, AuthRequest } from "../middlewares/auth";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/AppError";
import {validate} from "../middlewares/validate"
import { cartValidator } from "../validators/cartValidator";

const router = Router();

// Create cart (requires login)
router.post(
  "/",
  authenticate,cartValidator,validate,
  catchAsync(async (req: AuthRequest, res: Response) => {
    const cart = await Cart.create({ userId: req.user.id });
    res.json(cart);
  })
);

// Get all carts for logged-in user
router.get(
  "/",
  authenticate,
  catchAsync(async (req: AuthRequest, res: Response) => {
    const carts = await Cart.findAll({ where: { userId: req.user.id } });
    res.json(carts);
  })
);

// Get single cart
router.get(
  "/:id",
  authenticate,
  catchAsync(async (req: AuthRequest, res: Response) => {
    const cart = await Cart.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!cart) throw new AppError("Cart not found", 404);
    res.json(cart);
  })
);

// Update cart
router.put(
  "/:id",
  authenticate,
  catchAsync(async (req: AuthRequest, res: Response) => {
    const cart = await Cart.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!cart) throw new AppError("Cart not found", 404);
    await cart.update(req.body);
    res.json(cart);
  })
);

// Delete cart
router.delete(
  "/:id",
  authenticate,
  catchAsync(async (req: AuthRequest, res: Response) => {
    const cart = await Cart.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!cart) throw new AppError("Cart not found", 404);
    await cart.destroy();
    res.json({ message: "Cart deleted" });
  })
);

export default router;
